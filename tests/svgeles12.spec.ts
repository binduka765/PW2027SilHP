

import {test} from '@playwright/test';

test('tc1:svg ele test', async ({page})=>{

    await page.goto('https://www.flipkart.com/');

    await page.getByRole('textbox', {name:'Search for Products, Brands and More'}).fill('Macbook Pro');
    await page.getByRole('button', {name:'Search for Products, Brands and More'}).locator('svg[fill="none"]').click();

    await page.pause();
})

test('tc2:special xpath with local-name fn to find svg ele test', async ({page})=>{

    await page.goto('https://www.flipkart.com/');

    await page.getByRole('textbox', {name:'Search for Products, Brands and More'}).fill('Macbook Pro');

    await page.getByRole('button',{name:'Search for Products, Brands and More'}).locator("//*[local-name()='svg']").click();


        await page.pause();
})

test('tc3:special xpath with name fn to find svg ele test', async ({page})=>{

    await page.goto('https://www.flipkart.com/');

    await page.getByRole('textbox', {name:'Search for Products, Brands and More'}).fill('Macbook Pro');

    await page.getByRole('button',{name:'Search for Products, Brands and More'}).locator("//*[name()='svg']").click();
    
    await page.pause();
})