import { test } from "@playwright/test";

test("tc:", async ({ page }) => {
  //1.Alert:accept or dismiss
  await page.on("dialog", async (popup) => {
    if (popup.type() === "alert") {
      console.log(popup.message());
      await popup.accept();
    }
  });

  //3.prompt:only accept
  await page.on("dialog", async (popup) => {
    if (popup.type() === "prompt") {
      console.log(popup.message());
      await popup.accept("Binka auto Group");
    }
  });

  //3.Confirm:accept or dismiss
  await page.on("dialog", async (popup) => {
    if (popup.type() === "alert") {
      console.log(popup.message());
      await popup.accept();//click ok
    }
  });

  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  await page.getByRole("button", { name: "Click for JS Alert" }).click(); //jsalert popup
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Click for JS Confirm" }).click(); //prompt
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Click for JS Prompt" }).click();
  await page.waitForTimeout(2000);
  
  await page.pause();
});
