import { test, expect } from "@playwright/test";

test("Thank You Page ", async ({ browser }) => {
  
  const context = await browser.newContext({
    recordVideo: {
      dir: "tests/__videos__", // folder to save videos
      size: { width: 1280, height: 720 }, // optional resolution
    },
  });

  const page = await context.newPage();

  
  await page.goto("https://www.justinmind.com/thank-you-win", {
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

  
  //   screenshot comparison
  
  await expect(page).toHaveScreenshot("ThankYouPage.png", {
    fullPage: true,
    timeout: 30000,
  });



  await context.close();

  console.log("Justinmind Thank You page test completed! Screenshot and video saved.");
});
