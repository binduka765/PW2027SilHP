
import {test, Page, chromium, Browser, FrameLocator, Frame} from '@playwright/test';

test('Shadow Dom Element test', async ({page})=>{

    await page.goto('https://naveenautomationlabs.com/opencart/ui/shadow-dom.html');

    await page.locator('button#shadow-btn').click();

    //form
    await page.locator('#username').fill('BinAutoGp');
    await page.getByRole('button', {name:'Submit'}).click();

    //2 level shadow dom:
    await page.locator('#inner-input').fill('PW is interesting');

    //closed Shadow Dom:
    await page.locator('#closed-input').fill('hey its closed');

    await page.pause();

})