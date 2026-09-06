import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`new pages are reachable through shared navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    for (const route of ["/about", "/guide", "/contact"]) {
      if (width < 768) {
        const menuToggle = page.getByLabel("Site navigation menu");
        await menuToggle.click();
        const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
        await expect(navigation).toBeVisible();
        await navigation.locator(`a[href="${route}"]`).click();
        await expect(navigation).toBeHidden();
      } else {
        const navigation = route === "/contact"
          ? page.locator("footer")
          : page.getByRole("navigation", { name: "Main navigation", exact: true });
        await navigation.locator(`a[href="${route}"]`).click();
      }

      await expect(page).toHaveURL(new RegExp(`${route}$`));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("main")).toBeVisible();
    }

    await page.getByRole("banner").getByRole("link", { name: "NavaSound home", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}

test("guide checklist updates with keyboard input and resets without saving progress", async ({ page }) => {
  await page.goto("/guide");

  const checklist = page.getByRole("group", { name: "Your personal release checklist" });
  const checkboxes = checklist.getByRole("checkbox");
  const progress = page.getByRole("progressbar", { name: "Checklist progress" });
  const status = page.getByRole("status");
  const reset = page.getByRole("button", { name: "Reset checklist", exact: true });

  await expect(checkboxes).toHaveCount(5);
  await expect(progress).toHaveAttribute("max", "5");
  await expect(progress).toHaveAttribute("value", "0");
  await expect(reset).toBeDisabled();

  const first = checkboxes.first();
  await first.focus();
  await first.press("Space");
  await expect(first).toBeChecked();
  await expect(first).toBeFocused();
  await expect(progress).toHaveAttribute("value", "1");
  await expect(status).toHaveText("1 of 5 checked");

  await checkboxes.nth(1).check();
  await expect(progress).toHaveAttribute("value", "2");
  await first.uncheck();
  await expect(status).toHaveText("1 of 5 checked");

  await reset.click();
  await expect(checklist.locator("input:checked")).toHaveCount(0);
  await expect(progress).toHaveAttribute("value", "0");
  await expect(status).toHaveText("0 of 5 checked");
  await expect(reset).toBeDisabled();

  await first.check();
  await page.reload();
  await expect(checklist.locator("input:checked")).toHaveCount(0);
  await expect(status).toHaveText("0 of 5 checked");
});

test("contact email links keep the public mailbox as their only recipient", async ({ page }) => {
  await page.goto("/contact");

  const emailLinks = page.getByRole("main").locator('a[href^="mailto:"]');
  expect(await emailLinks.count()).toBeGreaterThan(0);
  for (const link of await emailLinks.all()) {
    const destination = new URL((await link.getAttribute("href"))!);
    expect(destination.pathname).toBe("hello@navasound.com");
    expect(destination.searchParams.has("cc")).toBe(false);
    expect(destination.searchParams.has("bcc")).toBe(false);
    expect(destination.searchParams.has("to")).toBe(false);
  }
});
