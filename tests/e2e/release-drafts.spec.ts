import { expect, test, type Locator, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const canary = "editable-draft-canary";
const releaseLabels = {
  releaseTitle: "Release title",
  primaryArtist: "Primary artist",
  contactEmail: "Contact email",
  releaseType: "Release type",
  labelName: "Label name",
  genre: "Primary genre",
  language: "Metadata language",
  targetDate: "Target release date",
  upc: "Existing UPC / EAN",
  artistLink: "Artist profile or music link",
  notes: "Release notes",
} as const;

const trackLabels = {
  title: "Track title",
  version: "Version / mix",
  artists: "Primary and featured artists",
  songwriters: "Songwriters / composers",
  explicit: "Explicit content",
  isrc: "Existing ISRC",
} as const;

function completeDraft() {
  return {
    kind: "navasound-release-draft",
    version: 1,
    release: {
      releaseTitle: `${canary} • Échos`,
      primaryArtist: "李 • Zoë",
      contactEmail: `${canary}@example.invalid`,
      releaseType: "EP",
      labelName: "Synthetic label",
      genre: "Électronique",
      language: "Français",
      targetDate: "2027-02-28",
      upc: "012345678901",
      artistLink: `https://example.invalid/${canary}`,
      notes: "Synthetic draft only.\nKeep collaborators’ credits together.",
    },
    tracks: [
      {
        title: "Écho un",
        version: "Original mix",
        artists: "李 • Zoë",
        songwriters: "Zoë Writer; 李 Writer",
        explicit: "No",
        isrc: "AUABC2600001",
      },
      {
        title: "Écho deux",
        version: "Radio edit",
        artists: "Zoë feat. Synthetic Guest",
        songwriters: "Guest Writer; Zoë Writer",
        explicit: "Clean version",
        isrc: "AUABC2600002",
      },
    ],
  };
}

async function fillRelease(page: Page, release: ReturnType<typeof completeDraft>["release"]) {
  for (const [key, label] of Object.entries(releaseLabels)) {
    const input = key === "releaseType"
      ? page.getByRole("combobox", { name: label, exact: true })
      : page.getByLabel(label, { exact: true });
    const value = release[key as keyof typeof release];
    if (key === "releaseType") await input.selectOption(value);
    else await input.fill(value);
  }
}

async function fillTrack(card: Locator, track: ReturnType<typeof completeDraft>["tracks"][number]) {
  for (const [key, label] of Object.entries(trackLabels)) {
    const input = key === "explicit"
      ? card.getByRole("combobox", { name: label, exact: true })
      : card.getByLabel(label, { exact: true });
    const value = track[key as keyof typeof track];
    if (key === "explicit") await input.selectOption(value);
    else await input.fill(value);
  }
}

async function expectDraftFields(page: Page, draft: ReturnType<typeof completeDraft>) {
  for (const [key, label] of Object.entries(releaseLabels)) {
    const input = key === "releaseType"
      ? page.getByRole("combobox", { name: label, exact: true })
      : page.getByLabel(label, { exact: true });
    await expect(input).toHaveValue(draft.release[key as keyof typeof draft.release]);
  }
  const cards = page.locator(".track-card");
  await expect(cards).toHaveCount(draft.tracks.length);
  for (const [index, track] of draft.tracks.entries()) {
    for (const [key, label] of Object.entries(trackLabels)) {
      const input = key === "explicit"
        ? cards.nth(index).getByRole("combobox", { name: label, exact: true })
        : cards.nth(index).getByLabel(label, { exact: true });
      await expect(input).toHaveValue(track[key as keyof typeof track]);
    }
  }
}

async function setDeclarations(page: Page, checked: boolean) {
  for (const checkbox of await page.locator('.release-declarations input[type="checkbox"]').all()) {
    await checkbox.setChecked(checked);
  }
}

async function expectNoDeclarations(page: Page) {
  const declarations = page.locator('.release-declarations input[type="checkbox"]');
  await expect(declarations).toHaveCount(4);
  for (const checkbox of await declarations.all()) await expect(checkbox).not.toBeChecked();
}

async function selectDraft(page: Page, draft: unknown, name = "synthetic-release-draft.json") {
  await page.getByLabel("Open saved draft", { exact: true }).setInputFiles({
    name,
    mimeType: "application/json",
    buffer: Buffer.from(typeof draft === "string" ? draft : JSON.stringify(draft)),
  });
}

function trackLocalBoundary(page: Page) {
  const requests: { url: string; method: string; body: string }[] = [];
  page.on("request", request => requests.push({ url: request.url(), method: request.method(), body: request.postData() ?? "" }));
  return async () => {
    expect(requests.filter(request => !["GET", "HEAD"].includes(request.method))).toEqual([]);
    expect(requests.some(request => `${request.url}${request.body}`.includes(canary))).toBe(false);
    expect(page.url()).not.toContain(canary);
    const storedData = await page.evaluate(() => `${JSON.stringify(localStorage)} ${JSON.stringify(sessionStorage)}`);
    expect(storedData).not.toContain(canary);
    expect(storedData).not.toContain("Zoë Writer");
  };
}

test("an incomplete editable draft survives download, reload and confirmed reopening", async ({ page }) => {
  const assertLocalBoundary = trackLocalBoundary(page);
  const draft = completeDraft();
  draft.release.contactEmail = "";
  draft.release.genre = "";
  draft.release.notes = "  Preserve this unfinished note.\nSecond line.  ";
  draft.tracks[1].songwriters = "";
  await page.goto("/release");
  await fillRelease(page, draft.release);
  const cards = page.locator(".track-card");
  await fillTrack(cards.nth(0), draft.tracks[0]);
  await page.getByRole("button", { name: "+ Add another track", exact: true }).click();
  await fillTrack(cards.nth(1), draft.tracks[1]);
  await cards.nth(1).getByRole("button", { name: "Move up", exact: true }).click();
  draft.tracks.reverse();
  await setDeclarations(page, true);

  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save editable draft", exact: true }).click();
  const download = await downloaded;
  expect(download.suggestedFilename()).toMatch(/^navasound-.+\.json$/);
  const contents = await readFile((await download.path())!, "utf8");
  expect(JSON.parse(contents)).toEqual(draft);
  await expect(page.locator(".draft-status")).toContainText(/saved|downloaded/i);

  await page.reload();
  await expect(page.getByLabel("Release title", { exact: true })).toBeEmpty();
  await expect(cards).toHaveCount(1);
  await selectDraft(page, contents);
  const dialog = page.getByRole("dialog", { name: "Open this draft?", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(draft.release.releaseTitle);
  await expect(page.getByLabel("Release title", { exact: true })).toBeEmpty();
  await dialog.getByRole("button", { name: "Open draft", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expectDraftFields(page, draft);
  await expectNoDeclarations(page);
  await assertLocalBoundary();
});

test("cancelling a staged draft preserves current edits and allows selecting it again", async ({ page }) => {
  await page.goto("/release");
  const draft = completeDraft();
  const currentTitle = `Keep ${canary} edits`;
  await page.getByLabel("Release title", { exact: true }).fill(currentTitle);
  await page.getByLabel("Track title", { exact: true }).fill("Existing unfinished track");
  await setDeclarations(page, true);
  const dialog = page.getByRole("dialog", { name: "Open this draft?", exact: true });

  for (const dismissal of ["Cancel", "Escape"]) {
    await selectDraft(page, draft);
    await expect(dialog).toBeVisible();
    await expect(page.getByLabel("Release title", { exact: true })).toHaveValue(currentTitle);
    await expect(page.locator(".track-card")).toHaveCount(1);
    if (dismissal === "Cancel") await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
    else await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(page.getByLabel("Release title", { exact: true })).toHaveValue(currentTitle);
    await expect(page.getByLabel("Track title", { exact: true })).toHaveValue("Existing unfinished track");
    for (const checkbox of await page.locator('.release-declarations input[type="checkbox"]').all()) {
      await expect(checkbox).toBeChecked();
    }
  }

  await selectDraft(page, draft);
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Open draft", exact: true }).click();
  await expectDraftFields(page, draft);
  await expectNoDeclarations(page);
});

test("invalid and oversized draft files cannot replace existing work", async ({ page }) => {
  const assertLocalBoundary = trackLocalBoundary(page);
  await page.goto("/release");
  const draft = completeDraft();
  await fillRelease(page, draft.release);
  await fillTrack(page.locator(".track-card"), draft.tracks[0]);
  await setDeclarations(page, true);
  const current = { ...draft, tracks: [draft.tracks[0]] };
  const cases = [
    ["malformed.json", '{"kind":'],
    ["unsupported-version.json", { ...draft, version: 999 }],
    ["other-tool.json", { ...draft, kind: "other-release-tool" }],
    ["embedded-declarations.json", { ...draft, declarations: { policiesAccepted: true } }],
    ["multiline-track-title.json", { ...draft, tracks: [{ ...draft.tracks[0], title: "Synthetic track\r\nHidden continuation" }] }],
    ["too-many-tracks.json", { ...draft, tracks: Array.from({ length: 101 }, () => draft.tracks[0]) }],
    ["oversized.json", " ".repeat(1_048_577)],
  ] as const;

  for (const [name, contents] of cases) {
    await selectDraft(page, contents, name);
    await expect(page.locator(".draft-status")).toContainText(name);
    await expect(page.locator(".draft-status")).toContainText(/could not|cannot|too large|not (?:a )?supported|invalid|unable|unsupported/i);
    await expect(page.getByRole("dialog", { name: "Open this draft?", exact: true })).not.toBeVisible();
    await expectDraftFields(page, current);
    for (const checkbox of await page.locator('.release-declarations input[type="checkbox"]').all()) {
      await expect(checkbox).toBeChecked();
    }
  }
  await assertLocalBoundary();
});

test("undo cannot exceed the track limit or prevent saving the current draft", async ({ page }) => {
  await page.goto("/release");
  const draft = completeDraft();
  draft.release.releaseType = "Album";
  draft.tracks = Array.from({ length: 100 }, (_, index) => ({
    ...draft.tracks[0],
    title: `Synthetic track ${index + 1}`,
    songwriters: `Synthetic writer ${index + 1}`,
  }));
  await selectDraft(page, draft);
  await page.getByRole("dialog", { name: "Open this draft?", exact: true }).getByRole("button", { name: "Open draft", exact: true }).click();
  const cards = page.locator(".track-card");
  const add = page.getByRole("button", { name: "+ Add another track", exact: true });
  await expect(cards).toHaveCount(100);
  await expect(add).toBeDisabled();

  await cards.nth(0).getByRole("button", { name: "Remove track", exact: true }).click();
  await expect(cards).toHaveCount(99);
  await expect(add).toBeEnabled();
  await add.click();
  const replacement = {
    ...draft.tracks[0],
    title: "New synthetic replacement",
    songwriters: "Preserve this newly entered writer",
  };
  await fillTrack(cards.nth(99), replacement);
  await expect(cards).toHaveCount(100);
  await expect(add).toBeDisabled();
  await expect(page.getByRole("button", { name: "Undo removal", exact: true })).toBeDisabled();

  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save editable draft", exact: true }).click();
  const download = await downloaded;
  const saved = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(saved).toEqual({ ...draft, tracks: [...draft.tracks.slice(1), replacement] });

  const declarations = page.locator('.release-declarations input[type="checkbox"]');
  await declarations.nth(0).check();
  await declarations.nth(2).check();
  await cards.nth(99).getByRole("button", { name: "Remove track", exact: true }).click();
  await expect(cards).toHaveCount(99);
  await page.getByRole("combobox", { name: "Restore a removed track", exact: true }).selectOption({ label: draft.tracks[0].title });
  await expect(cards).toHaveCount(100);
  await expect(cards.nth(0).getByLabel("Track title", { exact: true })).toHaveValue(draft.tracks[0].title);
  await expect(cards.nth(99).getByLabel("Track title", { exact: true })).toHaveValue(draft.tracks[99].title);
  await expect(page.getByRole("button", { name: "Undo removal", exact: true })).toBeDisabled();
  for (let index = 0; index < 4; index++) {
    await expect(declarations.nth(index)).toBeChecked({ checked: index === 0 || index === 2 });
  }

  const restoredDownload = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save editable draft", exact: true }).click();
  const restored = await restoredDownload;
  expect(JSON.parse(await readFile((await restored.path())!, "utf8"))).toEqual(draft);
});

test("imported drafts require fresh declarations and still obey brief validation", async ({ page }) => {
  const assertLocalBoundary = trackLocalBoundary(page);
  await page.goto("/release");
  await setDeclarations(page, true);
  const draft = completeDraft();
  draft.release.contactEmail = "unfinished-address";
  await selectDraft(page, draft);
  await page.getByRole("dialog", { name: "Open this draft?", exact: true }).getByRole("button", { name: "Open draft", exact: true }).click();
  await expectNoDeclarations(page);
  const review = page.getByRole("button", { name: "Review brief", exact: true });
  const email = page.getByLabel("Contact email", { exact: true });
  await review.click();
  await expect(email).toBeFocused();
  expect(await email.evaluate((input: HTMLInputElement) => input.validity.typeMismatch)).toBe(true);
  await expect(page.getByRole("dialog")).not.toBeVisible();

  await email.fill(`${canary}@example.invalid`);
  await review.click();
  await expect(page.locator('input[name="metadataAccurate"]')).toBeFocused();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await setDeclarations(page, true);
  await review.click();
  const preview = page.getByRole("dialog", { name: "Review your release brief." });
  await expect(preview).toBeVisible();
  await expect(preview).toContainText("1. Écho un (Original mix)");
  await expect(preview).toContainText("2. Écho deux (Radio edit)");
  await expect(preview).toContainText("Songwriters/composers: Guest Writer; Zoë Writer");
  await expect(preview).toContainText("Privacy Notice — Version 1.0");
  await assertLocalBoundary();
});
