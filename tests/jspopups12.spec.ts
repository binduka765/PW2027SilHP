import { test,Page } from "@playwright/test";

test("tc1:js alert popup handle test", async ({ page }) => {
  //1.Alert -- just accept it
  page.on("dialog", async (popup) => {
    if (popup.type() === "alert") {
      console.log(popup.message());
      await popup.accept();
    }
  });

  //2.Confirm:--hit cancel or ok-just accept it
  page.on("dialog", async (popup) => {
    if (popup.type() === "confirm") {
      await popup.accept(); //click on ok
      console.log(popup.message());
      // await popup.dismiss(); //click cancel
    }
  });

  //3.Prompt:
  page.on("dialog", async (popup) => {
    if (popup.type() === "prompt") {
      console.log(popup.message());
      await popup.accept("Binka Auto Group");
    }
  });

  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  await page.getByRole("button", { name: "Click for JS Alert" }).click(); //jsalert popup

  await page.getByRole("button", { name: "Click for JS Confirm" }).click(); //prompt

  await page.getByRole("button", { name: "Click for JS Prompt" }).click();

  await page.pause();
});

test('tc2:create ur own custom alert and print page title/url', async ({page})=>{

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    let pageTitle = await page.evaluate(()=>{
        alert('this is my custom alert...');

        return document.title;//props - NOT methods
    })

    console.log(pageTitle);

     
})

test('tc3:create custom alert and print page url', async ({page})=>{

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    let pageUrl = await page.evaluate(()=>{
        alert('this is my custom alert...');
    
        return document.url;
    })

    //console.log(pageUrl);

    console.log("Page URL:", page.url());


    await page.pause();

})
