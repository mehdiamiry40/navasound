import { expect, test } from "@playwright/test";

const pages = [
  ["/", "NavaSound — Your release, clearly handled"],
  ["/apply", "Apply for the founding-artist beta | NavaSound"],
  ["/release", "Prepare a release | NavaSound"],
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
