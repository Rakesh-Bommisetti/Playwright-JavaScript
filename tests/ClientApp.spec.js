const { test, expect } = require('@playwright/test')

test('Assignment', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("rb@test.com");
    await page.locator('#userPassword').fill("Rahul@123");
    await page.locator('#login').click();
    //console.log(await page.locator('.card-body b').first().textContent()); 
    await page.waitForLoadState('networkidle');
    //await page.locator(".card-body b").first().waitFor(); -> if the above method is not working we can use this wait 
    const allTitles = await page.locator('.card-body b').allTextContents();
    console.log(allTitles);
});



test('Assignment Video27', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const productName = 'ZARA COAT 3';
    const email = "rb@test.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("rb@test.com");
    await page.locator('#userPassword').fill("Rahul@123");
    await page.locator('#login').click();
    await page.locator(".card-body b").first().waitFor();

    //To select the product 
    const product = page.locator(".card-body");
    const count = await product.count();
    for (let i = 0; i < count; i++) {
        console.log(await product.nth(i).locator("b").textContent());
        if (await product.nth(i).locator("b").textContent() === productName) {
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //To verify the selected iteam is visible in the Cart 
    await page.locator("[routerlink='/dashboard/cart']").click();
    //To wait for the cart elemets to load 
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("(//input[@type='text'])[2]").fill("123");

    //To select the country Dynamically 
    await page.locator("[placeholder *= 'Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //To verify the user name in the Shipping Address. 
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    //To add coupon, and place order 
    await page.locator("[name='coupon']").waitFor();
    await page.locator("[name='coupon']").fill("rahulshettyacademy")
    await page.locator("[type='submit']").click();
    await page.locator("a:has-text('Place Order ')").waitFor();
    await page.locator("a:has-text('Place Order ')").click();

    //To verify the Heading 
    await page.locator("h1").first().waitFor();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //To get the Order ID 
    let orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    //To navigate to Oders 
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
});



//Same above testcase but this is using Special Locators(getBy) to optimize the code 
test('Login using special locators', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const productName = 'ZARA COAT 3';
    const email = "rb@test.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder('email@example.com').fill("rb@test.com");
    await page.getByPlaceholder('enter your passsword').fill("Rahul@123");
    await page.getByRole('button', { name: 'Login' }).click();

    //This we can not change as it under 'div' tag 
    await page.locator(".card-body b").first().waitFor();

    //To select the product 
    await page.locator(".card-body").filter({ hasText: 'ZARA COAT 3' })
        .getByRole("button", { name: 'Add to Cart' }).click()

    //To verify the selected iteam is visible in the Cart 
    await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();

    //To wait for the cart elemets to load 
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button", { name: 'Checkout' }).click();
    //page.getByRole("textbox",{}) 
    await page.locator("(//input[@type='text'])[2]").fill("123");

    //To select the country Dynamically 
    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 100 });
    await page.getByRole("button", { name: "India" }).nth(1).click();

    //To verify the user name is email. 
    await expect(page.getByText("rb@test.com")).toBeVisible();

    //To apply the Coupon  
    await page.locator("[name='coupon']").waitFor();
    await page.locator("[name='coupon']").fill("rahulshettyacademy")
    // await page.getByRole("textbox",{name:'coupon'}).fill("rahulshettyacademy"); 
    // await page.getByRole("button",{name:'Apply Coupon'}).click(); 

    //To place order 
    await page.locator("a:has-text('Place Order ')").waitFor();
    //We can use getByText to click the button or any text. 
    await page.getByText("PLACE ORDER").click();
    await page.locator("h1").first().waitFor();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    //To get the Order ID 
    let orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    //To navigate to Oders 
    await page.getByRole("button", { name: 'ORDERS' }).click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
    await page.pause();
});