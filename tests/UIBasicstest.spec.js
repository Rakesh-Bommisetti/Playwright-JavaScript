import { test, expect } from '@playwright/test';
//const { text } = require('node:stream/consumers'); 

//The below testcase open the page using browser context 
test('Context First Playwright', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const cardTitles = await page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('#username').fill('learing');
    await page.locator("[type='password']").fill('password');
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await page.locator("#signInBtn").click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = cardTitles.allTextContents();
    console.log(await allTitles);
});

//The above test case and this are same where we can declare paga, playwright will create broser and open the page 
test('Page First Playwright', async ({ page }) => {
    await page.goto("https://www.google.com/");
    await console.log(page.title());
    await expect(page).toHaveTitle("Google");
});

test('UI basics dropdown and radio button', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const userPassword = page.locator("[type='password']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill('rahulshettyacademy');
    await userPassword.fill('Learning@830$3mK2');
    const dropDown = page.locator("select.form-control");
    dropDown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    // It will print true or flase for the checkbox/radio button 
    console.log(page.locator('.radiotextsty').last().isChecked());
    // This assertion if fails it will stop the script 
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    // This is use to click the checkbox 
    await page.locator('#terms').click();
    // This assertion if fails it will stop the script 
    await expect(page.locator('#terms')).toBeChecked();
    // To uncheck the checkbox 
    await page.locator('#terms').uncheck();
    // There is no assertion for uncheck, but we can use toBeFalsy/toBeTruthy to check the parameter retrun true/flase  
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    //console.log(await page.locator("#username").inputValue()); 
    //await page.pause(); 
    //await page.locator("#signInBtn").click(); 
});