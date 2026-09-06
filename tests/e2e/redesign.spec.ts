import { expect, test } from "@playwright/test";

const responsiveRoutes = ["/", "/apply", "/release", "/about", "/guide", "/contact", "/legal", "/legal/privacy"];
const viewportWidths = [320, 390, 768, 1440];

for (const width of viewportWidths) {
  for (const route of responsiveRoutes) {
    test(`${route} keeps its content readable without horizontal scrolling at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);

      const heading = page.getByRole("heading", { level: 1 });
      await expect(heading).toHaveCount(1);
      await expect(heading).toBeVisible();
      await expect(heading).not.toHaveText("");
      await expect(page.getByRole("main")).toBeVisible();

      const headingBounds = await heading.boundingBox();
      expect(headingBounds).not.toBeNull();
      expect(headingBounds!.x).toBeGreaterThanOrEqual(-1);
      expect(headingBounds!.x + headingBounds!.width).toBeLessThanOrEqual(width + 1);

      const footer = page.locator("footer");
      const footerLink = footer.getByRole("link").first();
      await footerLink.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await expect(footerLink).toBeInViewport();

      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        return Math.max(root.scrollWidth, document.body.scrollWidth) - root.clientWidth;
      });
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
}

test("mobile navigation closes after reaching an in-page destination", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuToggle = page.getByLabel("Site navigation menu");
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeHidden();
  await menuToggle.focus();
  await menuToggle.press("Enter");
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Pricing", exact: true }).click();

  await expect(page).toHaveURL(/\/#pricing$/);
  await expect(navigation).toBeHidden();
  await expect(page.getByRole("heading", { level: 2, name: "Planned pricing. Per release.", exact: true })).toBeInViewport();
});

test("Escape closes mobile navigation and returns keyboard focus to its toggle", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuToggle = page.getByLabel("Site navigation menu");
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await menuToggle.focus();
  await menuToggle.press("Enter");
  const pricing = navigation.getByRole("link", { name: "Pricing", exact: true });
  await expect(pricing).toBeVisible();
  await pricing.focus();
  await pricing.press("Escape");

  await expect(navigation).toBeHidden();
  await expect(menuToggle).toBeFocused();
});

test("frequently asked questions can be read and closed with the keyboard", async ({ page }) => {
  await page.goto("/");

  for (const [question, answerExcerpt] of [
    ["Can I release my music through NavaSound today?", "Store delivery is not live yet."],
    ["Do I keep ownership of my music?", "does not transfer ownership or create a distribution agreement"],
  ]) {
    const disclosure = page.locator("details").filter({
      has: page.locator("summary").filter({ hasText: question }),
    });
    const summary = disclosure.locator("summary");
    const answer = disclosure.locator("p");

    await expect(answer).toBeHidden();
    await summary.scrollIntoViewIfNeeded();
    await summary.focus();
    await summary.press("Enter");
    await expect(answer).toBeVisible();
    await expect(answer).toContainText(answerExcerpt);
    await expect(summary).toBeFocused();
    await summary.press("Space");
    await expect(answer).toBeHidden();
    await expect(summary).toBeFocused();
  }
});

test("footer links and legal navigation connect the published policy pages", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("footer").getByRole("link", { name: "Privacy notice", exact: true }).click();
  await expect(page).toHaveURL(/\/legal\/privacy$/);
  await expect(page.getByRole("heading", { level: 1, name: "Privacy Notice" })).toBeVisible();

  const legalNavigation = page.getByRole("navigation", { name: "Legal documents" });
  await expect(legalNavigation.getByRole("link", { name: "Privacy", exact: true })).toHaveAttribute("aria-current", "page");
  await legalNavigation.getByRole("link", { name: "Website terms", exact: true }).click();
  await expect(page).toHaveURL(/\/legal\/terms$/);
  await expect(page.getByRole("heading", { level: 1, name: "Website Terms" })).toBeVisible();
  await expect(legalNavigation.getByRole("link", { name: "Website terms", exact: true })).toHaveAttribute("aria-current", "page");

  await legalNavigation.getByRole("link", { name: "Overview", exact: true }).click();
  await expect(page).toHaveURL(/\/legal$/);
  await page.getByRole("link", { name: /Beta Submission Terms What an early-access application/ }).click();
  await expect(page).toHaveURL(/\/legal\/beta$/);
  await expect(page.getByRole("heading", { level: 1, name: "Beta Submission Terms" })).toBeVisible();
});
