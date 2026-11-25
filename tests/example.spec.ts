import { test, expect, chromium, Browser } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});

test("tc3:google test", async ({ page }) => {
  await page.goto("https://google.com");
  let titleTxt = await page.title();
  let pageUrl: string = page.url();
  console.log(pageUrl);
});

test("tc4:google test using browser destructuring", async ({ browser }) => {
  let ctx1 = await browser.newContext();
  let page1 = await ctx1.newPage();

  await page1.goto("https://google.com");
  let titleTxt = await page1.title();
  let pageUrl: string = page1.url();
  console.log(pageUrl);
});

test("tc5:google-blank destructure test", async ({}) => {
  let browser:Browser = await chromium.launch({ channel: "chrome", headless: false });
  let page = await browser.newPage();//create a new page

  await page.goto("https://google.com");//enter the url
  let titleTxt = await page.title();//get the title
  let pageUrl: string = page.url();//get the url
  console.log(pageUrl);
});
