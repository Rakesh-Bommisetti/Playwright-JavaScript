const {test,expect,request} = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');

const loginPayLoad = { userEmail: "rb@test.com", userPassword: "Rahul@123" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
 
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
 
})

test('Session Storage', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://demowebshop.tricentis.com/");
    await page.locator(".ico-login").click();
    await page.locator("#Email").fill("rb1@test.com");
    await page.locator("#Password").fill("Demo@123");
    await page.pause();
    await page.locator(".login-button").click();
    await context.storageState({path:'DemoWorkShopSession.json'});
    const newBrowser = await browser.newContext({storageState:'DemoWorkShopSession.json'});
    const newPage = await newBrowser.newPage();
    await newPage.goto("https://demowebshop.tricentis.com/");
    await newPage.pause();
});
 
//create order is success
test.only('@SP Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
  console.log(await page.locator(".mt-4").textContent());
});