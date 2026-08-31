import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function fillApplication(page: Page) {
  await page.getByLabel("Contact name").fill("Synthetic Audit");
  await page.getByLabel("Artist or label name").fill("Audit Artist");
  await page.getByLabel("Contact email").fill("audit@example.invalid");
  await page.getByLabel("Tell us about the release").fill("Synthetic notes");
  for (const checkbox of await page.locator('input[type="checkbox"]').all()) {
    await checkbox.check();
  }
}

async function fillReleaseBrief(page: Page) {
  await page.getByLabel("Release title").fill("Audit EP");
  await page.getByLabel("Primary artist").fill("Audit Artist");
  await page.getByLabel("Contact email").fill("audit@example.invalid");
  await page.getByLabel("Primary genre").fill("Electronic");
  await page.getByLabel("Track title").fill("Track One");
  await page.getByLabel("Primary and featured artists").fill("Audit Artist");
  await page.getByLabel("Songwriters / composers").fill("Audit Writer");
  await page.getByLabel("Existing ISRC").fill("AU-ABC-26-12345");
  for (const checkbox of await page.locator('input[type="checkbox"]').all()) {
    await checkbox.check();
  }
}

test("application keeps a local downloadable fallback", async ({ page }) => {
  await page.goto("/apply");
  await fillApplication(page);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download application" }).click();
  const download = await downloadPromise;
  const path = await download.path();

  expect(download.suggestedFilename()).toMatch(/^navasound-.*-application\.txt$/);
  expect(path).not.toBeNull();
  const contents = await readFile(path!, "utf8");
  expect(contents).toContain("Synthetic Audit");
  expect(contents).toContain("audit@example.invalid");
  expect(contents).toContain("This application is for beta consideration only.");
  await expect(page.locator('[aria-live="polite"]')).toContainText(
    /not (?:been )?sent/i,
  );
});

test("release workspace downloads the complete local brief", async ({ page }) => {
  await page.goto("/release");
  await fillReleaseBrief(page);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download release brief" }).click();
  const download = await downloadPromise;
  const path = await download.path();

  expect(download.suggestedFilename()).toBe("navasound-audit-ep-brief.txt");
  expect(path).not.toBeNull();
  const contents = await readFile(path!, "utf8");
  expect(contents).toContain("Audit Artist");
  expect(contents).toContain("Track One");
  expect(contents).toContain("AU-ABC-26-12345");
  expect(contents).toContain("audit@example.invalid");
  await expect(page.locator('[aria-live="polite"]')).toContainText(
    /not (?:been )?sent/i,
  );
});

test("application email action remains fixed-recipient and truthful", async ({ page }) => {
  await page.goto("/apply");
  await fillApplication(page);

  await page
    .getByRole("button", { name: "Prepare application email" })
    .click({ noWaitAfter: true });

  await expect(page.locator('[aria-live="polite"]')).toContainText(
    "Application prepared, not sent",
  );
  expect(new URL(page.url()).pathname).toBe("/apply");
  expect(new URL(page.url()).search).toBe("");
});

test("clipboard fallback preserves keyboard focus", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Synthetic clipboard denial");
        },
      },
    });
  });

  await page.goto("/apply");
  await fillApplication(page);
  const copyApplication = page.getByRole("button", { name: "Copy application" });
  await copyApplication.focus();
  await copyApplication.press("Enter");
  await expect(copyApplication).toBeFocused();

  await page.goto("/release");
  await fillReleaseBrief(page);
  const copyBrief = page.getByRole("button", { name: "Copy brief" });
  await copyBrief.focus();
  await copyBrief.press("Enter");
  await expect(copyBrief).toBeFocused();
});

test("native validity remains available after hydration", async ({ page }) => {
  await page.goto("/apply");
  const submit = page.getByRole("button", { name: "Prepare application email" });
  await expect(submit).toBeEnabled();
  await submit.click();

  const firstField = page.getByLabel("Contact name");
  await expect(firstField).toBeFocused();
  const validationMessage = await firstField.evaluate(
    (element: HTMLInputElement) => element.validationMessage,
  );
  expect(validationMessage).not.toBe("");
});
