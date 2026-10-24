import { expect, test, type Page } from "@playwright/test";
import { requiredScriptHashes, uncoveredInlineScripts } from "../../src/lib/csp-inline";

const CSP_DIRECTIVE = "form-action 'none'";

const PAGES = [
  "/",
  "/apply",
  "/release",
  "/about",
  "/guide",
  "/contact",
  "/legal",
  "/legal/privacy",
  "/legal/terms",
  "/legal/beta",
  "/legal/refunds",
] as const;

function policyDirectives(policy: string) {
  return new Map(
    policy
      .split(";")
      .map((directive) => directive.trim())
      .filter(Boolean)
      .map((directive) => {
        const [name, ...sources] = directive.split(/\s+/);
        return [name, sources.join(" ")];
      }),
  );
}

function expectProductionPolicy(policy: string) {
  const directives = policyDirectives(policy);
  expect(directives.get("default-src")).toBe("'self'");
  expect(directives.get("script-src")).toMatch(/^'self'( 'sha256-[A-Za-z0-9+/]+=*')+$/);
  expect(directives.get("script-src")).not.toContain("nonce-");
  expect(directives.get("script-src")).not.toContain("unsafe-inline");
  expect(directives.get("script-src")).not.toContain("unsafe-eval");
  expect(directives.get("script-src")).not.toContain("strict-dynamic");
  expect(policy).not.toContain("vercel.live");
  expect(policy).not.toContain("__CSP_INLINE_HASHES__");
  expect(directives.get("script-src-attr")).toBe("'none'");
  expect(directives.get("style-src")).toMatch(/^'self'( 'sha256-[A-Za-z0-9+/]+=*')*$/);
  expect(directives.get("style-src")).not.toContain("unsafe-inline");
  expect(directives.get("style-src-attr")).toBe("'unsafe-inline'");
  expect(directives.get("img-src")).toBe("'self'");
  expect(directives.get("font-src")).toBe("'self'");
  expect(directives.get("connect-src")).toBe("'self'");
  expect(directives.get("media-src")).toBe("'self'");
  expect(directives.get("object-src")).toBe("'none'");
  expect(directives.get("base-uri")).toBe("'self'");
  expect(directives.get("form-action")).toBe("'none'");
  expect(directives.get("frame-src")).toBe("'none'");
  expect(directives.get("frame-ancestors")).toBe("'none'");
  expect(directives.get("worker-src")).toBe("'none'");
  expect(policy).not.toContain("*");
}

function expectInlineScriptsHashed(html: string, policy: string) {
  expect(requiredScriptHashes(html).length).toBeGreaterThan(0);
  expect(uncoveredInlineScripts(html, policy)).toEqual([]);
}

async function collectCspViolations(page: Page) {
  const violations: Array<{ directive: string; blockedURI: string; sample: string }> = [];
  await page.exposeBinding(
    "__reportCspViolation",
    (_source, violation: { directive: string; blockedURI: string; sample: string }) => {
      violations.push(violation);
    },
  );
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", (event) => {
      void (
        window as Window & {
          __reportCspViolation?: (violation: {
            directive: string;
            blockedURI: string;
            sample: string;
          }) => void;
        }
      ).__reportCspViolation?.({
        directive: event.effectiveDirective,
        blockedURI: event.blockedURI,
        sample: event.sample,
      });
    });
  });
  return violations;
}

test("security headers cover entry and form routes", async ({ page }) => {
  for (const route of ["/", "/apply", "/release"]) {
    const response = await page.goto(route);
    const policy = response?.headers()["content-security-policy"] ?? "";
    expect(policy).toContain(CSP_DIRECTIVE);
    expectProductionPolicy(policy);
    expectInlineScriptsHashed((await response?.text()) ?? "", policy);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    expect(response?.headers()["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin",
    );
  }
});

test("the hashed policy does not vary by forwarded protocol", async ({ request }) => {
  const forwarded = await request.get("/", {
    headers: { "x-forwarded-proto": "https" },
  });
  const plain = await request.get("/");
  const forwardedPolicy = forwarded.headers()["content-security-policy"] ?? "";
  const plainPolicy = plain.headers()["content-security-policy"] ?? "";
  expectProductionPolicy(plainPolicy);
  expect(forwardedPolicy).toBe(plainPolicy);
  expect(plainPolicy).not.toContain("upgrade-insecure-requests");
  expect(plainPolicy).not.toContain("nonce-");
});

test("public pages, forms, and the hero image load without CSP violations", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  const violations = await collectCspViolations(page);

  for (const route of PAGES) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
  }

  await page.goto("/");
  const hero = page.locator("img.studio-image");
  await expect(hero).toBeVisible();
  await expect
    .poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await page.getByRole("link", { name: "Apply for the beta" }).first().click();
  await expect(page).toHaveURL(/\/apply$/);
  await expect(page.locator("form")).toBeVisible();

  await page.goto("/guide");
  await page.getByRole("checkbox", { name: "Artist name, release title and track titles checked." }).check();
  await expect(page.getByRole("status")).toContainText("1 of 5 checked");

  expect(violations).toEqual([]);
  expect(consoleErrors.filter((message) => /content security policy/i.test(message))).toEqual(
    [],
  );
});

test("legacy form.submit cannot cross the local-only boundary", async ({ page, browserName }) => {
  const canary = "native-submit-canary";
  const requests: { url: string; method: string; body: string }[] = [];
  page.on("request", (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData() ?? "" }));

  await page.goto("/apply");
  await page.getByLabel("Contact name").fill(canary);
  const originalUrl = page.url();
  const violation = await page.locator("form").evaluate(async (form: HTMLFormElement, isFirefox) => {
    const blocked = new Promise<{ directive: string; disposition: string }>((resolve) => {
      document.addEventListener("securitypolicyviolation", (event) => {
        resolve({ directive: event.effectiveDirective, disposition: event.disposition });
      }, { once: true });
    });
    try {
      form.submit();
    } catch (error) {
      // Firefox throws NS_ERROR_CSP_FORM_ACTION_VIOLATION with empty name/message.
      if (
        !isFirefox || typeof error !== "object" || error === null ||
        !("result" in error) || error.result !== 0x805a0061 ||
        !("name" in error) || error.name !== "" ||
        !("message" in error) || error.message !== ""
      ) throw error;
    }
    return blocked;
  }, browserName === "firefox");
  await page.waitForTimeout(250);

  expect(violation).toEqual({ directive: "form-action", disposition: "enforce" });
  expect(page.url()).toBe(originalUrl);
  expect(requests.some(({ url, body }) => `${url}${body}`.includes(canary))).toBe(false);
  expect(requests.filter(({ method }) => !["GET", "HEAD"].includes(method))).toEqual([]);
});

test("submitter overrides cannot bypass the form-action boundary", async ({ page }) => {
  const canary = "submitter-override-canary";
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/");
  const originalUrl = page.url();

  await page.evaluate((value) => {
    const form = document.createElement("form");
    form.action = "/apply";
    form.method = "get";

    const field = document.createElement("input");
    field.name = "contactName";
    field.value = value;

    const submitter = document.createElement("button");
    submitter.type = "submit";
    submitter.formAction = "/release";
    submitter.formMethod = "get";

    form.append(field, submitter);
    document.body.append(form);
    form.requestSubmit(submitter);
  }, canary);
  await page.waitForTimeout(250);

  expect(page.url()).toBe(originalUrl);
  expect(requests.some((url) => url.includes(canary))).toBe(false);
});

test("JavaScript-disabled forms stay inert and explain the fallback", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });

  try {
    for (const route of ["/apply", "/release"]) {
      const page = await context.newPage();
      const response = await page.goto(route);
      expectProductionPolicy(response?.headers()["content-security-policy"] ?? "");
      await expect(page.locator(".form-noscript")).toBeVisible();
      for (const button of await page.locator("form button").all()) {
        await expect(button).toBeDisabled();
      }
      expect(page.url()).not.toContain("?");
      await page.close();
    }
  } finally {
    await context.close();
  }
});
