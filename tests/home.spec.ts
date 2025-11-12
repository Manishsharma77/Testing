import { test, expect } from "@playwright/test";

test("Justinmind Design Templates Page Visual Test with Video", async ({ browser }) => {

  const context = await browser.newContext({
    recordVideo: {
      dir: "tests/__videos__", 
      size: { width: 1280, height: 720 }, 
    },
  });

  const page = await context.newPage();

  
  await page.goto("https://www.justinmind.com/design-templates", {
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
    path: "tests/__screenshots__/DesignTemplatesPage.png",
    fullPage: true,
  });

  await context.close();

  console.log("Design Templates page test completed! Screenshot and video saved.");
});
