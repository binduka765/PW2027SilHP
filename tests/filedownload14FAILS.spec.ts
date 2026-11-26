
import {Download, expect, test} from '@playwright/test';
import fs from 'fs';

test('tc1:file download event test', async ({page})=>{

    test.setTimeout(60000);

    await page.goto('https://the-internet.herokuapp.com/download');

    const [download]:any =await Promise.all([

        page.waitForEvent('download'), //Promise<Download>
        page.getByRole('link',{name:'test_file.txt',exact:true}).click(), //Promise<void>
    ]);

    //during the download, make sure there is no downloading process:
    expect(await download.failure()).toBeNull();

    //get the file name:
    console.log('filename:', download.suggestedFilename());

    //save to a specific path:
    let filepath ='./Downloads/'+download.suggestedFilename();
    await download.saveAs(filepath);

    //verify the file exists:
    expect(fs.existsSync(filepath)).toBeTruthy();

    await page.pause();

})