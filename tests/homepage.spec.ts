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

test("renders metadata", async ({ page }) => {
  await page.goto(process.env.MAIN_URL || "http://localhost:3000");

  // Check if the metadata title is correct
  const metaTitle = await page.title();
  expect(metaTitle).toBe("Test Site");

  // Check if the metadata description is present
  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute(
    "content",
    "Please do not take this site seriously"
  );
});

test.describe("IpAddressGrabComponent", () => {
  test("should fetch and display the IP address", async ({ page }) => {
    // Intercept the API request and mock the response
    await page.route("https://api.ipify.org?format=json", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ip: "123.45.67.89" }),
      });
    });

    // Navigate to the page where the component is rendered
    await page.goto(process.env.MAIN_URL || "http://localhost:3000");

    // Wait for the IP address to be displayed
    const ipAddress = page.locator("text=123.45.67.89");
    await expect(ipAddress).toBeVisible();

    const loader = page.locator('[data-testid="loader"]');
    await expect(loader).not.toBeVisible();
  });

  test("should not show IP if API call fails", async ({ page }) => {
    // Intercept the API request and mock a failure response
    await page.route("https://api.ipify.org?format=json", (route) => {
      const mockResponse = {
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal Server Error" }),
      };
      route.fulfill(mockResponse);
    });

    // Navigate to the page where the component is rendered
    await page.goto(process.env.MAIN_URL || "http://localhost:3000");

    const loader = page.locator('[data-testid="loader"]');
    await expect(loader).toBeVisible();
  });
});
