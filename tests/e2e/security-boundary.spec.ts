import { expect, test } from "@playwright/test";

const CSP_DIRECTIVE = "form-action 'none'";

test("security headers cover entry and form routes", async ({ page }) => {
  for (const route of ["/", "/apply", "/release"]) {
    const response = await page.goto(route);
    expect(response?.headers()["content-security-policy"]).toContain(CSP_DIRECTIVE);
    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    expect(response?.headers()["referrer-policy"]).toBe(
      "strict-origin-when-cross-origin",
    );
  }
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
      expect(response?.headers()["content-security-policy"]).toContain(CSP_DIRECTIVE);
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
