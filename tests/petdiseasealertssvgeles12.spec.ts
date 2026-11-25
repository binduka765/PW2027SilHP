import {test} from "@playwright/test";

test("tc1:pet disease tricky svg ele test", async ({ page }) => {
  await page.goto("https://petdiseasealerts.org/forecast-map#/");

  await page.waitForTimeout(5000);

  //diff locators to reach to each region on dom:
  //css:
  //svg#map-svg g#regions g.region
  //g.region

  //xpaths:
  //*[local-name()='g' and @class='region']
  //*[local-name()='svg' and @id='map-svg']//*[local-name()='g' and @id='regions']//*[local-name()='g' and @class='region']

  //page.frameLocator('//iframe[contains(@id,"map-instance")');
  let frame = page.frameLocator('iframe[id*="map-instance"]');
  let allRegions: Locator[] = await frame.locator("g.region").all();

  console.log("total regions:", allRegions.length);

  for (let e of allRegions) {
    // await e.hover();

    let box = await e.boundingBox();
    let centreX = box!.x + box!.width/2;
    let centreY = box!.y + box!.height/2;
    await page.mouse.move(centreX, centreY);

    let stateName = await e.getAttribute("id");
    console.log(stateName);
    await page.waitForTimeout(50);
  }

  await page.pause();
});

//chat gpt given code for the same-but struck on alabama state and not moving forward/FAILS

test("tc2:pet disease tricky svg ele-chat gpt code test", async ({ page }) => {
  await page.goto("https://petdiseasealerts.org/forecast-map#/");

  const regions = page
    .frameLocator('iframe[id*="map-instance"]')
    .locator("g.region");

  await regions.first().waitFor();

  const count = await regions.count();
  console.log("total regions:", count);

  for (let i = 0; i < count; i++) {
    const region = regions.nth(i);

    await region.scrollIntoViewIfNeeded();
    await region.hover();

    console.log(await region.getAttribute("id"));
    await page.waitForTimeout(200);
  }

  await page.pause();
});
