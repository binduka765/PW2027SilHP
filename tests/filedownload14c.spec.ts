import { expect, test } from "@playwright/test";
import fs from 'fs';

test("tc1:single file upload test", async ({ page }) => {
    test.setTimeout(60000);
  await page.goto("https://the-internet.herokuapp.com/download");

  //----------------
//   const link = page.locator("//a[contains(@href,'bb.txt')]");

//   console.log("Link count:", await link.count());


  //----------------------------

  let [download]: any = await Promise.all([
    page.waitForEvent('download'),
    page.locator("//a[contains(@href,'testFile.txt')]").click(),
  ]);

  //ii)during download make sure there is no error:
  expect(await download.failure()).toBeNull();

  //iii)get the filename:
  console.log(download.suggestedFilename());

  //iv)save the file to a specific path:
  let filepath = './dload/';
  await download.saveAs(filepath);

  //v)verify the file exists:
  let filesize = fs.statSync(filepath).size;
  expect(filesize).toBeGreaterThan(0);

  await page.pause();
});
