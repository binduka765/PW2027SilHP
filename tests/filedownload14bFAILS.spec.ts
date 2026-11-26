
import { Download, test } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('tc1:file download event test', async ({ page }) => {

    test.setTimeout(60000);

    await page.goto('https://the-internet.herokuapp.com/download');

    const [download] = await Promise.all([

        page.waitForEvent('download'),

        page.getByRole('link', {
            name: 'test_file.txt',
            exact: true
        }).click(),

    ]);

    // Get the downloaded file name
    console.log('Filename:', download.suggestedFilename());

    // Create Downloads folder if it doesn't exist
    const downloadPath = path.join(process.cwd(), 'Downloads');

    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync('./Downloads/', { recursive: true });
    }

    // Save downloaded file
    await download.saveAs(
        path.join('./Downloads/', download.suggestedFilename())
    );

    console.log('File downloaded successfully!');

});

//execution sequence:
//1.Register download event listener

//2.page.waitForEvent('download')

//3.Click download link

//4.click()

//5. Download event gets triggered

//6.Playwright captures the Download object.

//7. Extract filename

//8.download.suggestedFilename()

//9. Save downloaded file

//10. download.saveAs(path)