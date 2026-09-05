import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const responsiveRoutes = ["/", "/apply", "/release", "/legal", "/legal/privacy"];
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

test("hero example previews the selected format and downloads a local sample", async ({ page }) => {
  await page.goto("/");

  const originalUrl = page.url();
  const outgoingWrites: string[] = [];
  page.on("request", request => {
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      outgoingWrites.push(`${request.method()} ${request.url()}`);
    }
  });
  const demo = page.getByRole("region", { name: "Explore the Release Readiness beta" });
  const formats = demo.getByRole("group", { name: "Example release format" });
  await expect(formats.getByRole("button", { name: "Single", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(demo).toContainText("INTERACTIVE EXAMPLE · NO INFORMATION IS SENT");

  for (const [format, expectedTracks] of [["Single", 1], ["EP", 3], ["Album", 5]] as const) {
    await formats.getByRole("button", { name: format, exact: true }).click();
    await expect(formats.getByRole("button", { pressed: true })).toHaveText(format);
    await demo.getByRole("button", { name: "Preview brief", exact: true }).click();

    const preview = demo.locator(`[aria-label="${format} release brief example"]`);
    await expect(preview).toBeVisible();
    await expect(preview).toBeFocused();
    await expect(preview.getByRole("listitem")).toHaveCount(expectedTracks);
    await expect(preview.getByRole("listitem").first()).toContainText("Blue Hour");
    await expect(preview).toContainText("Example artist · Sample data");
    await expect(preview.getByRole("link", { name: `Start your ${format.toLowerCase()} brief` })).toHaveAttribute("href", `/release?format=${format}`);

    if (format === "Album") {
      const downloadPromise = page.waitForEvent("download");
      await preview.getByRole("button", { name: "Download example", exact: true }).click();
      const download = await downloadPromise;
      expect(download.url()).toMatch(/^blob:/);
      expect(download.suggestedFilename()).toBe("navasound-example-brief.txt");
      const path = await download.path();
      expect(path).not.toBeNull();
      const content = await readFile(path!, "utf8");
      expect(content).toContain("Illustrative sample only. Nothing has been submitted.");
      expect(content).toContain("Format: Album");
      expect(content).toContain("1. Blue Hour\n2. Afterglow\n3. Slow Motion\n4. Coastline\n5. Home Again");
      expect(content).toContain("Distribution is not live yet.");
      await expect(preview.getByRole("status")).toHaveText("Example downloaded to your device. Nothing was sent.");
    }

    await preview.getByRole("button", { name: "Back", exact: true }).click();
    await expect(formats).toBeVisible();
    await expect(demo.getByRole("button", { name: "Preview brief", exact: true })).toBeFocused();
    await expect(formats.getByRole("button", { name: format, exact: true })).toHaveAttribute("aria-pressed", "true");
  }

  expect(page.url()).toBe(originalUrl);
  expect(outgoingWrites).toEqual([]);

  await formats.getByRole("button", { name: "EP", exact: true }).click();
  await demo.getByRole("button", { name: "Preview brief", exact: true }).click();
  await demo.getByRole("link", { name: "Start your ep brief", exact: true }).click();
  await expect(page).toHaveURL(/\/release\?format=EP$/);
  await expect(page.getByRole("combobox", { name: "Release type" })).toHaveValue("EP");
});

test("preview sidebar stays synchronized and preserves keyboard focus", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const feature = page.getByRole("region", { name: "Everything your release needs, in one brief.", exact: true });
    for (const [label, heading] of [
      ["credits", "Every credit counts."],
      ["export", "Your brief. Your copy."],
      ["brief", "A home for the details."],
    ]) {
      const control = feature.getByRole("button", { name: `Show ${label} preview`, exact: true });
      await control.click();
      await expect(control).toBeFocused();
      await expect(control).toHaveAttribute("aria-pressed", "true");
      await expect(feature.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    }
  }
});

test("desktop feature tabs support keyboard selection and the matching preview", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const feature = page.getByRole("region", { name: "Everything your release needs, in one brief.", exact: true });
  const tabs = feature.getByRole("tablist", { name: "RELEASE METADATA features" });
  const identity = tabs.getByRole("tab", { name: /^RELEASE IDENTITY/ });
  await expect(identity).toHaveAttribute("aria-selected", "true");
  await identity.focus();

  for (const [key, label, previewHeading] of [
    ["ArrowDown", "TRACK CREDITS", "Every credit counts."],
    ["End", "LOCAL EXPORT", "Your brief. Your copy."],
    ["Home", "RELEASE IDENTITY", "A home for the details."],
    ["ArrowUp", "LOCAL EXPORT", "Your brief. Your copy."],
    ["ArrowDown", "RELEASE IDENTITY", "A home for the details."],
  ]) {
    await page.keyboard.press(key);
    const selectedTab = tabs.getByRole("tab", { name: new RegExp(`^${label}`) });
    await expect(selectedTab).toBeFocused();
    await expect(selectedTab).toHaveAttribute("aria-selected", "true");
    await expect(tabs.getByRole("tab", { selected: true })).toHaveCount(1);
    const panel = feature.getByRole("tabpanel");
    await expect(panel).toHaveAttribute("aria-labelledby", (await selectedTab.getAttribute("id"))!);
    await expect(panel.getByRole("heading", { name: previewHeading, exact: true })).toBeVisible();
  }
});

test("mobile feature accordions remain usable when collapsed and resized to desktop", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const feature = page.getByRole("region", { name: "Everything your release needs, in one brief.", exact: true });
  const identity = feature.getByRole("button", { name: "RELEASE IDENTITY", exact: true });
  const credits = feature.getByRole("button", { name: "TRACK CREDITS", exact: true });
  const identityPanel = feature.getByRole("region", { name: "RELEASE IDENTITY", exact: true });
  const creditsPanel = feature.getByRole("region", { name: "TRACK CREDITS", exact: true });

  await expect(identity).toHaveAttribute("aria-expanded", "true");
  await expect(identityPanel.getByRole("heading", { name: "A home for the details." })).toBeVisible();
  await credits.focus();
  await credits.press("Enter");
  await expect(credits).toHaveAttribute("aria-expanded", "true");
  await expect(identity).toHaveAttribute("aria-expanded", "false");
  await expect(identityPanel).toBeHidden();
  await expect(creditsPanel.getByRole("heading", { name: "Every credit counts." })).toBeVisible();
  await credits.press("Space");
  await expect(credits).toHaveAttribute("aria-expanded", "false");
  await expect(creditsPanel).toBeHidden();

  await page.setViewportSize({ width: 1440, height: 1000 });
  const tabs = feature.getByRole("tablist", { name: "RELEASE METADATA features" });
  await expect(tabs).toBeVisible();
  await expect(tabs.getByRole("tab", { name: /^RELEASE IDENTITY/ })).toHaveAttribute("aria-selected", "true");
  await expect(tabs.getByRole("tab", { selected: true })).toHaveCount(1);
  await expect(feature.getByRole("tabpanel").getByRole("heading", { name: "A home for the details." })).toBeVisible();
  await tabs.getByRole("tab", { name: /^TRACK CREDITS/ }).click();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(credits).toHaveAttribute("aria-expanded", "true");
  await expect(creditsPanel.getByRole("heading", { name: "Every credit counts." })).toBeVisible();
});

test("track example adds and removes a sample track without changing the selected release format", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  const feature = page.getByRole("region", { name: "Every track, every credit. All in the right order.", exact: true });
  await feature.getByRole("tab", { name: /^EPS / }).click();
  const panel = feature.getByRole("tabpanel");
  await expect(panel.getByRole("heading", { name: "EP details", exact: true })).toBeVisible();
  await expect(panel.getByText("3 tracks", { exact: true })).toBeVisible();
  await panel.getByRole("button", { name: "+ DEMO TRACK", exact: true }).click();
  await expect(panel.getByText("Untitled demo track", { exact: true })).toBeVisible();
  await expect(panel.getByText("4 tracks", { exact: true })).toBeVisible();
  await expect(panel).toContainText("Metadata only");
  await expect(panel).toContainText("Audio is not requested.");
  await panel.getByRole("button", { name: "REMOVE DEMO TRACK", exact: true }).click();
  await expect(panel.getByText("Untitled demo track", { exact: true })).toBeHidden();
  await expect(panel.getByText("3 tracks", { exact: true })).toBeVisible();
  await expect(panel.getByRole("heading", { name: "EP details", exact: true })).toBeVisible();

  await feature.getByRole("tab", { name: /^TRACK ORDER / }).click();
  await expect(panel.getByRole("heading", { name: "Track order", exact: true })).toBeVisible();
  await expect(panel.locator(".sample-track").first()).toContainText("Blue Hour");
  await panel.getByRole("button", { name: "REVERSE ORDER", exact: true }).click();
  await expect(panel.locator(".sample-track").first()).toContainText("Home Again");
  await panel.getByRole("button", { name: "RESET ORDER", exact: true }).click();
  await expect(panel.locator(".sample-track").first()).toContainText("Blue Hour");
});

test("pricing format example changes the sample without offering a checkout", async ({ page }) => {
  await page.goto("/");
  const pricing = page.getByRole("region", { name: "Planned pricing. Per release.", exact: true });
  const format = pricing.getByRole("combobox", { name: "Release format" });

  await expect(format).toHaveValue("Single");
  await expect(pricing.getByText("1 track", { exact: true })).toBeVisible();
  await format.selectOption("EP");
  await expect(pricing.getByText("3 tracks", { exact: true })).toBeVisible();
  await format.selectOption("Album");
  await expect(pricing.getByText("5 tracks", { exact: true })).toBeVisible();
  await expect(pricing).toContainText("No payment is taken now.");
  await expect(pricing.getByRole("button", { name: /pay|checkout|purchase/i })).toHaveCount(0);
  await expect(pricing.getByRole("link", { name: "PRICING & REFUND DETAILS" })).toHaveAttribute("href", "/legal/refunds");
});

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

test("desktop tools menu follows a clicked link and dismisses outside", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const menu = page.locator(".nav-dropdown");
  const toggle = menu.locator("summary");
  await toggle.focus();
  await toggle.press("Enter");
  await menu.getByRole("link", { name: /^Artist application/ }).click();
  await expect(page).toHaveURL(/\/apply$/);

  await page.goto("/");
  await toggle.focus();
  await toggle.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await page.getByRole("heading", { level: 1 }).click();
  await expect(menu).not.toHaveAttribute("open", "");
});
