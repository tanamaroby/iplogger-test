import { DISCLAIMER_TEXT, TITLE_TEXT } from "@/lib/constants";
import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto(process.env.MAIN_URL || "http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(TITLE_TEXT);
});

test("has disclaimer", async ({ page }) => {
  await page.goto(process.env.MAIN_URL || "http://localhost:3000");

  await expect(page.locator("text=Disclaimer")).toBeVisible();
  await expect(page.locator(`text=${DISCLAIMER_TEXT}`)).toBeVisible();
});
