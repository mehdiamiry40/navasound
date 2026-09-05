import { expect, test, type Locator, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function fillIdentity(page: Page) {
  await page.getByLabel("Release title", { exact: true }).fill("Local polish canary");
  await page.getByLabel("Primary artist", { exact: true }).fill("Synthetic Artist");
  await page.getByLabel("Contact email").fill("polish@example.invalid");
  await page.getByLabel("Primary genre").fill("Electronic");
  await page.getByLabel("Label name").fill("Synthetic label");
  await page.getByLabel("Target release date").fill("2027-01-15");
  await page.getByLabel("Existing UPC / EAN").fill("012345678901");
  await page.getByLabel("Artist profile or music link").fill("https://example.invalid/artist");
  await page.getByLabel("Release notes").fill("Synthetic local review notes.");
}

async function fillTrack(track: Locator, title: string, number: number) {
  await track.getByLabel("Track title", { exact: true }).fill(title);
  await track.getByLabel("Version / mix").fill(`Mix ${number}`);
  await track.getByLabel("Primary and featured artists").fill(`Performer ${number}`);
  await track.getByLabel("Songwriters / composers").fill(`Writer ${number}`);
  await track.getByLabel("Explicit content").selectOption(number === 2 ? "Yes" : "No");
  await track.getByLabel("Existing ISRC").fill(`AUABC260000${number}`);
}

async function acceptDeclarations(page: Page) {
  for (const checkbox of await page.locator('.release-declarations input[type="checkbox"]').all()) {
    await checkbox.check();
  }
}

test("workspace accepts only a single whitelisted format and retains the canonical URL", async ({ page }) => {
  for (const format of ["Single", "EP", "Album"]) {
    await page.goto(`/release?format=${format}`);
    await expect(page.getByRole("combobox", { name: "Release type", exact: true })).toHaveValue(format);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://navasound.com/release");
  }

  for (const query of ["", "?format=unsupported", "?format=album", "?format=EP&format=Album"]) {
    await page.goto(`/release${query}`);
    await expect(page.getByRole("combobox", { name: "Release type", exact: true })).toHaveValue("Single");
  }

  await page.goto("/release?format=EP&releaseTitle=ignored&contactEmail=ignored%40example.invalid");
  await expect(page.getByRole("combobox", { name: "Release type", exact: true })).toHaveValue("EP");
  await expect(page.getByLabel("Release title", { exact: true })).toBeEmpty();
  await expect(page.getByLabel("Contact email")).toBeEmpty();
  await page.getByRole("combobox", { name: "Release type", exact: true }).selectOption("Album");
  await expect(page.getByRole("combobox", { name: "Release type", exact: true })).toHaveValue("Album");
});

test("track editing keeps focus and exports every credit in the chosen order", async ({ page }) => {
  await page.goto("/release?format=Album");
  await fillIdentity(page);
  const cards = page.locator(".track-card");
  await fillTrack(cards.nth(0), "First Track", 1);
  await expect(cards.nth(0).getByRole("button", { name: "Move up", exact: true })).toBeDisabled();
  await expect(cards.nth(0).getByRole("button", { name: "Move down", exact: true })).toBeDisabled();
  await expect(cards.nth(0).getByRole("button", { name: "Remove track", exact: true })).toBeDisabled();

  for (const [index, title] of [[1, "Second Track"], [2, "Third Track"]] as const) {
    await page.getByRole("button", { name: "+ Add another track", exact: true }).click();
    await expect(cards.nth(index).getByLabel("Track title", { exact: true })).toBeFocused();
    await fillTrack(cards.nth(index), title, index + 1);
  }

  await cards.nth(0).getByRole("button", { name: "Move down", exact: true }).click();
  await expect(cards.nth(1).getByLabel("Track title", { exact: true })).toHaveValue("First Track");
  await expect(cards.nth(1).getByRole("button", { name: "Move down", exact: true })).toBeFocused();
  await expect(page.locator(".local-tool-status")).toContainText("moved to track 2 of 3");
  await cards.nth(1).getByRole("button", { name: "Move down", exact: true }).click();
  await expect(cards.nth(2).getByLabel("Track title", { exact: true })).toBeFocused();
  await cards.nth(2).getByRole("button", { name: "Move up", exact: true }).click();
  await expect(cards.nth(1).getByRole("button", { name: "Move up", exact: true })).toBeFocused();
  await cards.nth(2).getByRole("button", { name: "Remove track", exact: true }).click();
  await expect(cards.nth(1).getByLabel("Track title", { exact: true })).toBeFocused();
  await expect(cards).toHaveCount(2);
  await acceptDeclarations(page);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download release brief" }).click();
  const download = await downloadPromise;
  const path = await download.path();
  expect(path).not.toBeNull();
  const text = await readFile(path!, "utf8");
  expect(text).toContain("Release type: Album");
  expect(text).toContain("1. Second Track (Mix 2)\n   Artists: Performer 2\n   Songwriters/composers: Writer 2\n   Explicit: Yes\n   Existing ISRC: AUABC2600002");
  expect(text).toContain("2. First Track (Mix 1)\n   Artists: Performer 1\n   Songwriters/composers: Writer 1\n   Explicit: No\n   Existing ISRC: AUABC2600001");
  expect(text).not.toContain("Third Track");

  await cards.nth(0).getByRole("button", { name: "Remove track", exact: true }).click();
  await expect(cards).toHaveCount(1);
  await expect(cards.nth(0).getByLabel("Track title", { exact: true })).toBeFocused();
  await expect(cards.nth(0).getByRole("button", { name: "Remove track", exact: true })).toBeDisabled();
});

test("review requires complete metadata and every declaration before displaying a brief", async ({ page }) => {
  await page.goto("/release");
  const review = page.getByRole("button", { name: "Review brief", exact: true });
  await review.click();
  await expect(page.getByLabel("Release title", { exact: true })).toBeFocused();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await fillIdentity(page);
  await fillTrack(page.locator(".track-card"), "First Track", 1);
  await acceptDeclarations(page);

  for (const checkbox of await page.locator('.release-declarations input[type="checkbox"]').all()) {
    await checkbox.uncheck();
    await review.click();
    await expect(checkbox).toBeFocused();
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(page.locator(".release-review-content")).toBeEmpty();
    await checkbox.check();
  }
});

test("complete review stays local and returns focus on Escape and close", async ({ page }) => {
  const requests: { url: string; method: string; body: string }[] = [];
  page.on("request", request => requests.push({ url: request.url(), method: request.method(), body: request.postData() ?? "" }));
  await page.goto("/release?format=EP");
  await fillIdentity(page);
  await fillTrack(page.locator(".track-card"), "First Track", 1);
  await acceptDeclarations(page);
  const originalUrl = page.url();
  const review = page.getByRole("button", { name: "Review brief", exact: true });
  await review.click();
  const dialog = page.getByRole("dialog", { name: "Review your release brief." });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close review" })).toBeFocused();
  await expect(dialog).toContainText("Contact email: polish@example.invalid");
  await expect(dialog).toContainText("Release type: EP");
  await expect(dialog).toContainText("Label name: Synthetic label");
  await expect(dialog).toContainText("Target release date: 2027-01-15");
  await expect(dialog).toContainText("Existing UPC/EAN: 012345678901");
  await expect(dialog).toContainText("Existing artist link: https://example.invalid/artist");
  await expect(dialog).toContainText("1. First Track (Mix 1)");
  await expect(dialog).toContainText("Synthetic local review notes.");
  await expect(dialog).toContainText("Privacy Notice — Version 1.0");
  await expect(dialog).toContainText("Beta Submission Terms — Version 1.0");
  await expect(dialog).toContainText("This brief is preparation only.");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(review).toBeFocused();
  await expect(page.locator(".release-review-content")).toBeEmpty();

  await review.click();
  await dialog.getByRole("button", { name: "Close review" }).click();
  await expect(review).toBeFocused();
  expect(page.url()).toBe(originalUrl);
  expect(requests.filter(request => !["GET", "HEAD"].includes(request.method))).toEqual([]);
  expect(requests.some(request => `${request.url}${request.body}`.includes("polish@example.invalid"))).toBe(false);
  expect(requests.some(request => `${request.url}${request.body}`.includes("Local%20polish%20canary"))).toBe(false);
  const storedData = await page.evaluate(() => `${JSON.stringify(localStorage)} ${JSON.stringify(sessionStorage)}`);
  expect(storedData).not.toContain("polish@example.invalid");
  expect(storedData).not.toContain("Local polish canary");
});
