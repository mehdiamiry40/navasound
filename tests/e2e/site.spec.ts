import { expect, test } from "@playwright/test";

const pages = [
  ["/", "NavaSound Release Readiness — Your release, clearly handled"],
  ["/apply", "Apply for the Release Readiness beta | NavaSound"],
  ["/release", "Release readiness workspace | NavaSound"],
  ["/legal", "Legal and trust centre | NavaSound"],
  ["/legal/privacy", "Privacy Notice | NavaSound"],
  ["/legal/terms", "Website Terms | NavaSound"],
  ["/legal/beta", "Beta Submission Terms | NavaSound"],
  ["/legal/refunds", "Refunds and Cancellations | NavaSound"],
] as const;

for (const [route, title] of pages) {
  test(`${route} has route-specific canonical and social metadata`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://navasound.com${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://navasound.com${route === "/" ? "" : route}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      title,
    );
  });
}

test("homepage separates the available beta from future distribution", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Available now. Coming later." }),
  ).toBeVisible();
  await expect(page.locator(".launch-status-card-now")).toContainText(
    "Human fit and readiness review",
  );
  await expect(page.locator(".launch-status-card-now")).not.toContainText(
    /upload|artwork|payment|DSP delivery|royalt/i,
  );
  await expect(page.locator(".launch-status-card-later")).toContainText(
    "Royalty statements and payouts",
  );
  await expect(page.locator(".launch-status-card-later")).toContainText(
    "Final agreement and payment, followed by secure audio and artwork upload",
  );
  await expect(page.locator(".step-phase")).toHaveText([
    "AVAILABLE NOW",
    "AVAILABLE NOW",
    "AVAILABLE NOW",
    "COMING LATER",
    "COMING LATER",
  ]);
  await expect(page.getByText("TARGET LAUNCH PRICING", { exact: true })).toBeVisible();
  await expect(page.locator(".steps li").nth(2)).not.toContainText("artwork");
  await expect(page.locator(".steps li").nth(3)).toContainText(
    "final agreement, secure upload and provider delivery",
  );
});

test("application page explains eligibility and the manual review process", async ({ page }) => {
  await page.goto("/apply");

  await expect(
    page.getByRole("heading", { name: "Know the beta before you apply." }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Who the beta is for" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What happens after applying" }),
  ).toBeVisible();
  await expect(page.getByText("Submitting an application does not guarantee a place"))
    .toBeVisible();
  await expect(page.getByText(/No payment is taken now/)).toBeVisible();
});

test("release workspace explains the manual brief handoff without file uploads", async ({
  page,
}) => {
  await page.goto("/release");

  await expect(page.getByText(/manually email it to NavaSound for readiness review/))
    .toBeVisible();
  await expect(page.getByText("Do not attach masters or artwork.", { exact: false }))
    .toBeVisible();
});

test("crawl routes and branded 404 are available", async ({ page, request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("https://navasound.com/sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("https://navasound.com/apply");
  expect(sitemapText).toContain("https://navasound.com/legal/privacy");

  const notFound = await page.goto("/missing-page");
  expect(notFound?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /page.*not found/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /return home/i })).toBeVisible();
});

test("mobile menu restores access without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.locator(".mobile-menu");
  await expect(menu).toBeVisible();
  await menu.locator("summary").click();
  await expect(menu.getByRole("link", { name: "Pricing" })).toBeVisible();
  await expect(menu.getByRole("link", { name: "Legal & trust" })).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBe(0);

  await page.goto("/apply");
  await expect(page.getByLabel("Contact name")).toHaveCSS("font-size", "16px");
});
