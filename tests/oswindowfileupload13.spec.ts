import { test } from "@playwright/test";

test("tc1:file upload test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/ui/file-upload.html",
  );

  await page
    .locator("input#single-file")
    .setInputFiles("C:/Users/binduk/Documents/test.pdf");

  await page.pause();
});

test("tc2:practise web app file upload test", async ({
  page,
}) => {
  await page.goto("https://practice.expandtesting.com/upload");

  await page
    .locator("input#fileInput")
    .setInputFiles("C:/Users/binduk/Documents/test.pdf");

  await page.pause();
});

test("tc3:multiple file upload test", async ({
  page,
}) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");

  await page.locator("input#multi-file").setInputFiles([
    "C:/Users/binduk/Documents/test.pdf",
    "c:/Users/binduk/Documents/PW_13.txt"
  ])

  await page.pause();
});

test("tc4:file upload test when type file not in Dom", async ({
  page,
}) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");

  let [fileupload] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator("#custom-upload-btn").click()
  ])

  await fileupload.setFiles('C:/Users/binduk/Documents/test.pdf');

    await page.pause();
});

test("tc5:multiple files upload test when type file not in Dom", async ({
  page,
}) => {
  await page.goto("https://naveenautomationlabs.com/opencart/ui/file-upload.html");

  let [fileupload] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator("#custom-upload-btn").click()
  ])

  await fileupload.setFiles([
    "C:/Users/binduk/Documents/test.pdf",
    "c:/Users/binduk/Documents/PW_13.txt"
  ]);

    await page.pause();
});

test("tc6:file removal test", async ({ page }) => {
  await page.goto(
    "https://naveenautomationlabs.com/opencart/ui/file-upload.html",
  );

  await page
    .locator("input#single-file")
    .setInputFiles("C:/Users/binduk/Documents/test.pdf");

  await page.pause();

  await page.locator('#single-file').setInputFiles([]);

  await page.pause();
});
