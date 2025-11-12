import { test, expect } from "@playwright/test";

test("Justinmind Pricing Page Visual Regression with Video", async ({ browser }) => {

  const context = await browser.newContext({
    recordVideo: {
      dir: "tests/__videos__", 
      size: { width: 1280, height: 720 }, 
    },
  });

  const page = await context.newPage();

  
  await page.goto("https://www.justinmind.com/pricing", {
    waitUntil: "networkidle",
    timeout: 90000,
  });

  
  await page.waitForTimeout(8000);

  
  await page.evaluate(() => {
    const selectors = [".popup", ".banner", ".intercom-launcher", ".cookie-consent"];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        (el as HTMLElement).style.display = "none";
      });
    });
  });

  
  await expect(page).toHaveScreenshot("PricingPage.png", {
    fullPage: true,
    timeout: 30000,
  });

 
  await context.close();

  console.log("Justinmind Pricing page test completed! Screenshot and video saved.");
});
