import {test, FrameLocator, Frame } from "@playwright/test";

test("tc1:iframe test", async ({ page }) => {
  await page.goto(
    "https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/",
  );

  await page.getByTitle("Vehicle-Registration-Forms-and-Examples").click();

  let frameLoc: FrameLocator = page.frameLocator("#frame-one748593425");

  await frameLoc
    .getByRole("textbox", { name: "Proposal title *", exact: true })
    .fill("proposeATitle");

  await frameLoc.getByRole("textbox", { name: "Location" }).fill("Bangalore");

  //checking where the page obj is - proving outside of frame ele-capturing title-'Vehicle Registration Form' on page
  let vrfHeaderOnPageTxt: string = await page
    .locator(".details__form-preview-title")
    .innerText();
  console.log(vrfHeaderOnPageTxt);

  await page.pause();
});

test("tc2:vehicle reg form complete fill HW test", async ({ page }) => {
  await page.goto(
    "https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/",
  );

  await page.getByTitle("Vehicle-Registration-Forms-and-Examples").click();

  let frameLoc: FrameLocator = page.frameLocator("#frame-one748593425");

  await frameLoc
    .getByRole("textbox", { name: "Proposal title *", exact: true })
    .fill("proposeATitle");

  await frameLoc.getByRole("textbox", { name: "Location" }).fill("Bangalore");

  await page.pause();
});

test("tc3: london free lance frame element test", async ({ page }) => {
  await page.goto("https://www.londonfreelance.org//courses/frames/index.html");

  // let headerTwo = await page.frameLocator("//frame[@name='main']").getByRole('heading',{level:2}).innerText();
  // console.log(headerTwo);

  let footHeader = await page
    .frameLocator("frame[name='bot']")
    .getByRole("heading", { level: 2 })
    .innerText();
  console.log(footHeader);

  await page.pause();
});

test("tc4: london free lance total frame elements test", async ({ page }) => {
  await page.goto("https://www.londonfreelance.org//courses/frames/index.html");

  let frameCount = page.frames().length;
  console.log(frameCount); //9

  await page.pause();
});

test("tc5: london free lance all frames-print name, url test", async ({
  page,
}) => {
  await page.goto("https://www.londonfreelance.org//courses/frames/index.html");

  let allFrames: Frame[] = page.frames();
  let frCount = allFrames.length;

  for (let e of allFrames) {
    let frName = e.name();
    let frUrl = e.url();

    console.log(frName + ":" + frUrl);
  }

  await page.pause();
});

test("tc6: dezlearn nested iframes test", async ({ page }) => {
  await page.goto("https://www.dezlearn.com/nested-iframes-example/");

  let parentFr = page.frameLocator("#parent_iframe");
  let childFr = parentFr.frameLocator("#iframe1");

  await childFr.getByRole("button", { name: "Click Here" }).click();
  let mesg = await childFr.locator("#processing").innerText();
  console.log(mesg); //Hooray..! You clicked the button from iframe 2

  // await page.frameLocator('#parent_iframe')
  //         .frameLocator('#iframe1')
  //             .getByRole('button', {name:'Click Here'}).click();

  await page.pause();
});

test("tc7: dezlearn nested iframes parent frame mesge capture test", async ({
  page,
}) => {
  await page.goto("https://www.dezlearn.com/nested-iframes-example/");

  let parentFr = page.frameLocator("#parent_iframe");
  let childFr = parentFr.frameLocator("#iframe1");

  await parentFr.getByRole("button", { name: "Click Here" }).click();
  let mesg = await parentFr.locator("p#processing").innerText();
  console.log(mesg); //Hooray..! You clicked the button from iframe 1

  await page.pause();
});
