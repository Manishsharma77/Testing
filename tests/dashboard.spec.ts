import { test, expect } from "@playwright/test";

test("Justinmind Homepage Visual Test with Video", async ({ browser }) => {
  // ✅ Create a browser context with video recording
  const context = await browser.newContext({
    recordVideo: {
      dir: "tests/__videos__", // folder to save video
      size: { width: 1280, height: 720 }, // optional resolution
    },
  });

  const page = await context.newPage();

  
  await page.goto("https://www.justinmind.com/", {
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


  await page.screenshot({
    path: "tests/__screenshots__/JustinmindHomepage.png",
    fullPage: true,
  });

 
  await context.close();

  console.log("Justinmind homepage test completed! Screenshot and video saved.");
});
