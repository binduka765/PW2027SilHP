import {test} from "@playwright/test";

test("tc1:pseudoelement test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  );

  let content = await page.evaluate(() => {
    return window
      .getComputedStyle(
        document.querySelector('label[for="input-firstname"]')!,
        "::before",
      ) //! for null check purpose
      .getPropertyValue("content");
  });

  console.log(content); //"* " tc:PASSED

  let color = await page.evaluate(() => {
    return window
      .getComputedStyle(
        document.querySelector('label[for="input-firstname"]')!,
        "::before",
      )
      .getPropertyValue('color');//rgb(255, 0, 0) tc:PASSED
  });

  console.log(color);

  await page.pause();
});
