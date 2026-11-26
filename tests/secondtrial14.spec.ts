
import { test, expect } from '@playwright/test';
import fs from 'fs';

test("tc1:single file download test", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/download");

    const link = page.locator("//a[contains(@href,'sample.json')]");

    console.log("Link count:", await link.count());

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        link.click()
    ]);

    // Verify no download failure
    expect(await download.failure()).toBeNull();

    // Get filename
    console.log(download.suggestedFilename());

    // Save file
    const filepath = './dload/sample.txt';

    await download.saveAs(filepath);

    // Verify file exists and has content
    const filesize = fs.statSync(filepath).size;

    expect(filesize).toBeGreaterThan(0);

    console.log("File downloaded successfully!");

});