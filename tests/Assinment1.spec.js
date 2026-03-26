const { test, expect } = require("@playwright/test");

test('Assigment1 Section9', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = 'rb@test.com';
    const password = 'Rahul@123';
    page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel('password').fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByRole('link', { name: 'Browse Events' }).nth(0)).toBeVisible();
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Manage Events' }).nth(0).click();

    //Step 2 
    const eventName = 'Event' + String(Date.now());
    await page.locator('#event-title-input').fill(eventName);
    await page.locator('#admin-event-form textarea').fill('Test Description')
    await page.getByLabel('City').fill('Hyderabad');
    await page.getByLabel('Venue').fill('Kokapet');
    //await page.getByLabel('Event Date & Time').futureDateValue();
    await page.getByLabel('Price').fill("100");
    await page.getByLabel('Seats').fill("100");
    await page.pause();
    //await page.locator('#add-event-btn').click();  
}); 