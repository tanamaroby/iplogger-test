import { DISCLAIMER_TEXT, TITLE_TEXT } from "@/lib/constants";
import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await expect(page.locator(`text=${TITLE_TEXT}`)).toBeVisible();
  });

  test("has disclaimer", async ({ page }) => {
    await expect(page.locator("text=Disclaimer")).toBeVisible();
    await expect(page.locator(`text=${DISCLAIMER_TEXT}`)).toBeVisible();
  });

  test("renders metadata", async ({ page }) => {
    const metaTitle = await page.title();
    expect(metaTitle).toBe("IP Grabber");

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Please do not use this illegally"
    );
  });
});

test.describe("IpAddressGrabComponent", () => {
  test("should fetch and display IP and location", async ({ page }) => {
    await page.route("https://api.ipify.org?format=json", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ip: "123.45.67.89" }),
      });
    });

    await page.route("https://ip-api.com/json/*", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          query: "123.45.67.89",
          status: "success",
          continent: "Test Continent",
          continentCode: "TC",
          country: "Neverland",
          countryCode: "NL",
          region: "NL-01",
          regionName: "Imaginary Region",
          city: "Fantasy City",
          district: "District 9",
          zip: "99999",
          lat: 1.234,
          lon: 2.345,
          timezone: "Dream/Time",
          offset: 0,
          currency: "NLD",
          isp: "Imaginary ISP",
          org: "MagicOrg",
          as: "AS12345",
          asname: "MagicNet",
          mobile: false,
          proxy: false,
          hosting: false,
        }),
      });
    });

    await page.goto("/");

    const ipText = page.locator("text=123.45.67.89");
    await expect(ipText).toBeVisible();

    const locationLoader = page.locator('[data-testid="loader2"]');
    await locationLoader.waitFor({ state: "detached" });

    await expect(page.locator('[data-testid="location-card"]')).toBeVisible();
  });

  test("Don't show location card if IP isn't found", async ({ page }) => {
    await page.route("https://api.ipify.org?format=json", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Fail" }),
      });
    });

    await page.goto("/");

    await expect(
      page.locator('[data-testid="location-card"]')
    ).not.toBeVisible();
  });
});

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should be visible at the bottom", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should show author name and GitHub link", async ({ page }) => {
    await expect(page.locator("text=Made with ❤️ by")).toBeVisible();
    const githubLink = page.locator('a[href="https://github.com/tanamaroby"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveText(/Roby Tanama/);
  });

  test("should show disclaimer", async ({ page }) => {
    await expect(
      page.locator(
        "text=This website is for learning, testing, and demo purposes only"
      )
    ).toBeVisible();
  });

  test("should show copyright", async ({ page }) => {
    const currentYear = new Date().getFullYear();
    await expect(
      page.locator(`text=© ${currentYear} All rights reserved`)
    ).toBeVisible();
  });
});
