import { test } from "@playwright/test";
require('dotenv').config();

const username = process.env.email
const password = process.env.password

test('Login',async({page})=>{

    //Goto:  Github Login Page
    await page.goto('https://github.com/login');

    //Enter Login Details
    await page.goto('https://github.com/login');
    await page.fill('input[name="login"]', username);
    await page.fill('input[name="password"]', password);
    await page.waitForTimeout(3000);
    await page.click('input[type="submit"]');
    await page.waitForTimeout(15000);


    //Save the Logged-in Session in Playwright
    await page.context().storageState({path:"./TestUtility/LoginAuth.json"})
})