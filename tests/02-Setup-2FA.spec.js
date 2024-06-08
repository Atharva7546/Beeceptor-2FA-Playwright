import { expect, test } from "@playwright/test";
const fs = require('fs');


test.use({ storageState: './TestUtility/LoginAuth.json' })
test('Setting up QR code for TOTP', async ({ page }) => {

    //Goto : Your GitHub security page to setup Auth
    await page.goto('https://github.com/settings/security');                             

    // Click on Enable AUthenticator 
    await page.click('button[aria-label="Edit Authenticator app"]');
    await page.waitForTimeout(2000)

    // Take a Screenshot of the Qr code
    await page.screenshot({ path: './TestUtility/GitHUb-Test.png' });

    const filePath = './TestUtility/GitHUb-Test.png'
    if (!fs.existsSync(filePath)) { throw new Error('QR code file does not exist.'); }
    const fileBuffer = fs.readFileSync(filePath);

    //The captured Qr Code is then sent to the beeceptor's 2FA API
    const response = await page.request.post('https://tools.beeceptor.com/2FA/TOTP/', {
        multipart: {
            qrcode: {
                name: 'qrcode.png',
                mimeType: 'image/png',
                buffer: fileBuffer,
            },
        },
    });

    //Catch the respone and extract the ID & OTP.
    const responseBody = await response.json();
    const { otp } = responseBody;
    const { id } = responseBody;


    //Fill the OTP in the Auth Input of GitHub Page.
    await page.waitForSelector('input[name="otp"]');
    await page.fill('input[name="otp"]', otp);
    await page.waitForTimeout(2000)

    //Verify that the OTP is succesfully validated.
    await page.waitForSelector('.color-fg-success');
    const otpVerified = await page.isVisible('.color-fg-success');
    expect(otpVerified).toBeTruthy()

    //Once verified click on save button.
    await page.click('button[data-target="two-factor-configure-otp-factor.saveButton"]');
    await page.waitForTimeout(2000)

    //The ID is then stored in a JSON file for further Usage.
    fs.writeFileSync('./TestUtility/2FA-id.json', JSON.stringify({ id }));
})