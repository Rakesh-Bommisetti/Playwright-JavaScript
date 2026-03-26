const {test, expect} = require('@playwright/test');

test('Assignment Section 9', async ({browser}) => {
    
    //Step 1: Login to the application
    //const browser = await browser.newContext();
    const page = await browser.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill('rb@test.com');
    await page.getByLabel('Password').fill('Rahul@123');
    await page.locator('#login-btn').click();
    await expect(page.getByText('Browse Events →')).toBeVisible();

    //Step 2: Admin and create an event
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('link', {name:'Manage Events'}).nth(0).click();
    await page.locator('#event-title-input').nth(1).fill('Playwright event'+String(new Date().getDate()));

});