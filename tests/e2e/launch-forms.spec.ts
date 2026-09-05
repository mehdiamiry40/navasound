import { expect, test, type Locator, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const whitespace = " \u00a0\u2003 ";

async function acceptPolicies(page: Page) {
  for (const checkbox of await page.locator('input[type="checkbox"]').all()) {
    await checkbox.check();
  }
}

async function fillIdentity(page: Page) {
  await page.getByLabel("Release title", { exact: true }).fill("Échos de nuit");
  await page.getByLabel("Primary artist", { exact: true }).fill("李 • Zoë");
  await page.getByLabel("Contact email").fill("launch@example.invalid");
  await page.getByLabel("Primary genre").fill("Électronique");
  await page.getByLabel("Metadata language").fill("Français");
}

async function fillTrack(track: Locator, number: number) {
  await track.getByLabel("Track title", { exact: true }).fill(`Écho ${number}`);
  await track.getByLabel("Version / mix").fill(`Mix ${number}`);
  await track.getByLabel("Primary and featured artists").fill(`李 • Artist ${number}`);
  await track.getByLabel("Songwriters / composers").fill(`Zoë Writer ${number}`);
  await track.getByLabel("Explicit content").selectOption(number === 2 ? "Clean version" : "No");
  await track.getByLabel("Existing ISRC").fill(`AUABC260000${number}`);
}

test("application rejects whitespace for every action and accepts corrected Unicode names", async ({ page }) => {
  await page.goto("/apply");
  await page.getByLabel("Contact name").fill("Zoë 李");
  await page.getByLabel("Artist or label name").fill("Écho • Records");
  await page.getByLabel("Contact email").fill("launch@example.invalid");
  await acceptPolicies(page);

  for (const [label, correction] of [["Contact name", "Zoë 李"], ["Artist or label name", "Écho • Records"]]) {
    const input = page.getByLabel(label, { exact: true });
    await input.fill(whitespace);
    for (const name of ["Prepare application email", "Copy application", "Download application"]) {
      await page.getByRole("button", { name }).click();
      await expect(input).toBeFocused();
      expect(await input.evaluate((element: HTMLInputElement) => element.validity.patternMismatch)).toBe(true);
      await expect(page.locator(".local-tool-status")).toContainText("Your answers stay on this device");
    }
    await input.fill(correction);
    expect(await input.evaluate((element: HTMLInputElement) => element.checkValidity())).toBe(true);
  }

  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download application" }).click();
  const download = await downloaded;
  const contents = await readFile((await download.path())!, "utf8");
  expect(contents).toContain("Contact name: Zoë 李");
  expect(contents).toContain("Artist or label name: Écho • Records");
  await expect(page.locator(".local-tool-status")).toContainText("It has not been sent.");
});

test("release actions reject blank required metadata and resume after corrections", async ({ page }) => {
  await page.goto("/release");
  await fillIdentity(page);
  await fillTrack(page.locator(".track-card"), 1);
  await acceptPolicies(page);

  for (const label of ["Release title", "Primary artist", "Primary genre", "Metadata language", "Track title", "Primary and featured artists", "Songwriters / composers"]) {
    const input = page.getByLabel(label, { exact: true });
    const originalValue = await input.inputValue();
    await input.fill(whitespace);
    for (const name of ["Review brief", "Copy brief", "Download release brief"]) {
      const action = page.getByRole("button", { name, exact: true });
      await action.focus();
      await action.press("Enter");
      await expect(input).toBeFocused();
      expect(await input.evaluate((element: HTMLInputElement) => element.validity.patternMismatch)).toBe(true);
      await expect(page.getByRole("dialog")).not.toBeVisible();
    }
    await input.fill(originalValue);
    expect(await input.evaluate((element: HTMLInputElement) => element.checkValidity())).toBe(true);
  }

  await page.getByRole("button", { name: "Review brief", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Review your release brief." });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Title: Échos de nuit");
  await expect(dialog).toContainText("Primary artist: 李 • Zoë");
  await expect(dialog).toContainText("Songwriters/composers: Zoë Writer 1");
});

test("nonblank text validation also exists before JavaScript is available", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    for (const route of ["/apply", "/release"]) {
      await page.goto(route);
      for (const input of await page.locator('input[required]:not([type="email"]):not([type="checkbox"])').all()) {
        await input.fill(whitespace);
        expect(await input.evaluate((element: HTMLInputElement) => element.validity.patternMismatch)).toBe(true);
        await input.fill("李 • Zoë");
        expect(await input.evaluate((element: HTMLInputElement) => element.checkValidity())).toBe(true);
      }
    }
  } finally {
    await context.close();
  }
});

test("undo restores multiple removed tracks with their credits, order and focus", async ({ page }) => {
  const requests: { url: string; method: string; body: string }[] = [];
  page.on("request", request => requests.push({ url: request.url(), method: request.method(), body: request.postData() ?? "" }));
  await page.goto("/release?format=Album");
  await fillIdentity(page);
  const cards = page.locator(".track-card");
  await fillTrack(cards.nth(0), 1);
  for (const number of [2, 3]) {
    await page.getByRole("button", { name: "+ Add another track", exact: true }).click();
    await fillTrack(cards.nth(number - 1), number);
  }

  await cards.nth(1).getByRole("button", { name: "Remove track", exact: true }).click();
  await expect(cards.nth(1).getByLabel("Track title", { exact: true })).toBeFocused();
  await cards.nth(0).getByRole("button", { name: "Remove track", exact: true }).click();
  await expect(cards).toHaveCount(1);
  await expect(cards.nth(0).getByLabel("Track title", { exact: true })).toHaveValue("Écho 3");
  await expect(cards.nth(0).getByRole("button", { name: "Remove track", exact: true })).toBeDisabled();
  await expect(page.locator(".track-undo")).toContainText("2 removed tracks");

  await page.getByRole("button", { name: "Undo removal" }).click();
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0).getByLabel("Track title", { exact: true })).toBeFocused();
  await expect(cards.nth(0).getByLabel("Track title", { exact: true })).toHaveValue("Écho 1");
  await page.getByRole("button", { name: "Undo removal" }).click();
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(1).getByLabel("Track title", { exact: true })).toBeFocused();
  await expect(page.locator(".local-tool-status")).toContainText("“Écho 2” restored as track 2 of 3, with all its details.");
  await expect(page.getByRole("button", { name: "Undo removal" })).toBeHidden();

  for (const number of [1, 2, 3]) {
    const track = cards.nth(number - 1);
    await expect(track.getByLabel("Track title", { exact: true })).toHaveValue(`Écho ${number}`);
    await expect(track.getByLabel("Version / mix")).toHaveValue(`Mix ${number}`);
    await expect(track.getByLabel("Primary and featured artists")).toHaveValue(`李 • Artist ${number}`);
    await expect(track.getByLabel("Songwriters / composers")).toHaveValue(`Zoë Writer ${number}`);
    await expect(track.getByLabel("Explicit content")).toHaveValue(number === 2 ? "Clean version" : "No");
    await expect(track.getByLabel("Existing ISRC")).toHaveValue(`AUABC260000${number}`);
  }
  await acceptPolicies(page);
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download release brief" }).click();
  const download = await downloaded;
  const contents = await readFile((await download.path())!, "utf8");
  for (const number of [1, 2, 3]) {
    expect(contents).toContain(`${number}. Écho ${number} (Mix ${number})\n   Artists: 李 • Artist ${number}\n   Songwriters/composers: Zoë Writer ${number}\n   Explicit: ${number === 2 ? "Clean version" : "No"}\n   Existing ISRC: AUABC260000${number}`);
  }
  expect(requests.filter(request => !["GET", "HEAD"].includes(request.method))).toEqual([]);
  expect(requests.some(request => `${request.url}${request.body}`.includes("launch@example.invalid"))).toBe(false);
  const storedData = await page.evaluate(() => `${JSON.stringify(localStorage)} ${JSON.stringify(sessionStorage)}`);
  expect(storedData).not.toContain("launch@example.invalid");
  expect(storedData).not.toContain("Writer");
});
