import test, { expect } from "@playwright/test";
import fs from 'fs';
import path from 'path';

test("sample trial test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");

  const link = page.getByRole("link", {
    name: "test_file.txt",
    exact: true,
  });

  console.log("Link count:", await link.count());
  console.log("Link visible:", await link.isVisible());

  await page.pause();
});

// [chromium] › tests\sample14trial.spec.ts:4:1 › sample trial test
// Link count: 0
// Link visible: false
//   1 passed (10.8s)

test("tc2:step two trial", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");

  const links = page.getByRole("link");

  console.log("Total links:", await links.count());

  const linkTexts = await links.allTextContents();

  console.log("Available links:", linkTexts);

  await page.pause();
});


test('tc3:file download event test', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');

    const link = page.getByRole('link', {
        name: 'sample.txt',
        exact: true
    });

    // Verify locator
    await expect(link).toBeVisible();

    // Wait for download event and click
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        link.click()
    ]);

    // Verify download success
    expect(await download.failure()).toBeNull();

    // Get filename
    console.log('Filename:', download.suggestedFilename());

    // Create Downloads folder
    const folderPath = path.join(process.cwd(), 'Downloads');

    fs.mkdirSync(folderPath, { recursive: true });

    // Save downloaded file
    const filepath = path.join(
        folderPath,
        download.suggestedFilename()
    );

    await download.saveAs(filepath);

    // Verify file exists
    expect(fs.existsSync(filepath)).toBeTruthy();

    console.log('File downloaded successfully!');

});

// ReferenceError: expect is not defined
//     at tests\sample14trial.spec.ts:49:5
