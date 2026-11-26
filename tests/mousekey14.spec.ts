import test from "@playwright/test";

test('tc1:right or context click test', async ({page})=>{

    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

    await page.getByText('right click me',{exact:true}).click({button:'right'});

    await page.pause();

    await page.getByText('Copy',{exact:true}).click();


    await page.pause();

})

test('tc2:single mouse hover and click on ele test ', async ({page})=>{

    await page.goto('https://www.spicejet.com/');

    await page.getByText('Travel Policies',{exact:true}).hover();

    await page.getByText('Tariffs', {exact:true}).waitFor({state:'visible'});

    await page.getByText('Tariffs', {exact:true}).click();


    await page.pause();

})

test('tc3:level 2 menu-submenu handling test-2 clicks and 2 hovers-ACCESS DENIED', async ({page})=>{

    await page.goto('https://www.bigbasket.com/');

    //first click:
    await page.getByText('Category',{exact:true}).nth(1).click();

    //first hover:
    await page.locator("#headlessui-menu-items-:R15d956:").getByRole('link',{name:'Beverages'}).hover();

    //second hover:
    await page.locator("#headlessui-menu-items-:R15d956:").getByRole('link',{name:'Tea'}).hover();

    //third click:
    await page.locator("#headlessui-menu-items-:R15d956:").getByRole('link', {name:'Green Tea'}).click();



    await page.pause();

})

 test('tc4:drag and drop action test', async ({page})=>{

    await page.goto('https://jqueryui.com/droppable/');

    let frame = page.frameLocator("iframe[src*='droppable']");

    let source = frame.locator("#draggable");
    let target = frame.locator("#droppable");

    await source.dragTo(target);



    await page.pause();

})

test('tc5:keyboard enter handling', async ({page})=>{

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    let searchBox = page.getByRole('textbox',{name:'Search'});
    await searchBox.fill("macbook");

    //press enter:
    await searchBox.press('Enter');

    await page.pause();

})

test('tc6:tab sequence-accessibility testing', async ({page})=>{

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    //create the locator for first field of the form:
    let fn = page.getByRole('textbox',{name:'First Name'});
    await fn.fill("Shruthi");

    await fn.press('Tab');
    await page.keyboard.type('Devyani');
    await page.keyboard.press('Tab');
    await page.keyboard.type('DevS27@appmail.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('1111111111');
    await page.keyboard.press('Tab');
    await page.keyboard.type('DevyaniS@27');
    await page.keyboard.press('Tab');
    await page.keyboard.type('DevyaniS@27');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Space');//does click on chk box
    await page.keyboard.press('Enter');//press enter-submit the form




    await page.pause();

})