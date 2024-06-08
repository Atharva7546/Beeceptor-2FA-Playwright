import { expect, test } from "@playwright/test";
const fs = require('fs');
require('dotenv').config();

const username = process.env.email
const password = process.env.password

test('GitHub Login with 2FA', async ({ page }) => {

    // Open Github and login using password.
    await page.goto('https://github.com/login');
    await page.fill('input[name="login"]', username );
    await page.fill('input[name="password"]', password);
    await page.waitForTimeout(3000);
    await page.click('input[type="submit"]');

    // Stored the ID in the configuration file as data
    const data = fs.readFileSync('./TestUtility/2FA-id.json', 'utf8');
    const { id } = JSON.parse(data);

    // Call Beeceptor API to retireve current TOTP
    const response = await page.request.get(`https://tools.beeceptor.com/2FA/TOTP/${id}`);
    const responseBody = await response.json();
    console.table(responseBody);
    const { otp } = responseBody;

    // Submit the OTP on the login screen.    
    await page.waitForSelector('//input[@id="app_totp"]', { timeout: 10000 });
    await page.fill('//input[@id="app_totp"]', otp);
    await page.waitForTimeout(1000);

    // Validate successful login.
    const dashboard = await page.textContent('h2[data-target="feed-container.feedTitle"]');
    expect(dashboard).toContain('Home');
})