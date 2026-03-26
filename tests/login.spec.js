import { test, expect } from '@playwright/test';

test.only('login form', async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/');
  //await expect(page.locator('Log in to Facebook')).toBeVisible();
  await page.getByRole('textbox', { name: 'email' }).fill('Rakesh');
  await page.getByRole('textbox', { name: 'Pass' }).fill('Rakesh@123');
  await page.pause();
  
});