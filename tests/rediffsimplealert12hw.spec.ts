
import {test} from '@playwright/test';

test('tc1:rediff mail alert popup', async ({page})=>{

    //jsalert popup:
    await page.on('dialog', async (popup)=>{

        if(popup.type()==='alert'){
            console.log(popup.message());
            popup.accept();
        }
    })

    await page.goto('https://mail.rediff.com/cgi-bin/login.cgi');

    await page.getByRole('button', {name:'Log In'}).click();

    await page.waitForTimeout(5000);

    await page.pause();

})