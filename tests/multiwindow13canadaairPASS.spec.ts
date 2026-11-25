import { Locator, Page, test } from "@playwright/test";

test("tc1:multi window/tab handle test", async ({ browser }) => {
     test.setTimeout(60_000);
  let context1 = await browser.newContext();
  let page = await context1.newPage(); //pointing to first tab
  await page.goto("https://www.aqi.in/dashboard/canada"); //not letting to automate

  //childWindowPage -- pointing to second tab
  let [childWindowPage] = await Promise.all([
    context1.waitForEvent("page"), //starts listening to the page event in the browser
    page
      .locator("//a[contains(@href,'about-us') and @target='_blank']")
      .click(), //this will click on the link
  ]);

  await childWindowPage.waitForLoadState(); //default state always LOAD

  let allPages = context1.pages(); //Returns all open pages in the context.return type: Page[]
  console.log("total no of pages:", allPages.length);

  await childWindowPage.bringToFront(); //2 tab in focus-ACTIVATED
  console.log("the child window title:", await childWindowPage.title());
  //close the child window
  await childWindowPage.close();

  await page.bringToFront(); //bring the focus back to parent window
  console.log("parent window title:", await page.title());

  await page.pause();
});

//passed:
// total no of pages: 2
// the child window title: About Us - AQI
// parent window title: Canada Air Quality Index (AQI) : Real-Time Air Pollution

//=========================================================================TC2:start

// click on multiple links:
// About us,AQI App,Historic AQI City Ranking,Climate Change
//each link visited-print the title of child and return to parent window inside a loop

test("tc2:multiple four window handles test", async ({ browser },) => {
     test.setTimeout(60_000);
  let context = await browser.newContext();
  let page = await context.newPage(); //pointing to first tab
  await page.goto("https://www.aqi.in/dashboard/canada");

  //i)create the array of links:for all links:Locator []
  let links: Locator[] = [
    page.locator("//a[contains(@href,'about-us') and @target='_blank']"),//About us

    page.locator("(//a[contains(@href, 'climate-change') and @target='_blank'])[1]"),//climate change

    page.locator("(//a[contains(@href, 'aqi-app') and @target='_blank'])[2]"),//AQI App

    page.locator("(//a[contains(@href, 'polluted-countries') and @target='_blank'])[1]")

    //page.locator("(//a[contains(@href, 'cities') and @target='_blank'])[1]"),//historic AQI Ranking

  ];

  //ii)create an empty array: open all links to push all linkids into empty array:allChWinPages
  let allChWinPages: Page[] = [];//empty array

  //iii) loop thru the links array-grab each link id and store/push it in the empty array:
  for(let e of links){
   let [chwindow] = await Promise.all([
        context.waitForEvent('page'),
        e.click()

   ]);

   await chwindow.waitForLoadState();
   allChWinPages.push(chwindow);

  }

  console.log(context.pages().length);

  //iv)print all child window eles: traversing thru new loaded array:allChWinPages
  for(let e of allChWinPages){

   await e.bringToFront();
   let pageTitle = await e.title();
   console.log(pageTitle);
   await e.close();
   await page.waitForTimeout(1000);
  }

  await page.bringToFront();
  console.log('parent window :', await page.title());
  console.log('remaining pages:', context.pages().length);

  await page.pause();
});

//5
// About Us - AQI
// Analyse City Climate Change Severity With Weather Data
// AQI Air Quality App | Real-Time Air Pollution Alerts | AQI.IN
// World's Most Polluted Countries 2025 | AQI Ranking
// parent window : Canada Air Quality Index (AQI) : Real-Time Air Pollution
// remaining pages: 1
//   1 passed (32.4s)
