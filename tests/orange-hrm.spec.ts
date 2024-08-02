import { test, expect, type Page } from '@playwright/test';
import { LoginLocators } from '../pom/loginpage';
import account from '../resources/account.json'
test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

const DATASET =[
    'Admin',
    'admin123',
    'wrongtext'
] as const;



test.describe('Login success', () => {
  test('login success when inputing valid username and password', async ({ page }) => {
    const locators = new LoginLocators(page);


    //fill inputs
    await locators.inputUsername.fill(account.username);
    await locators.inputPassword.fill(account.password);

    //locator submit button and click
    await locators.submitButton.click();

    //Make sure the url to be right
    await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 

    //make sure it have text "Dashboard" 
    await expect(locators.dashboardLink).toHaveText('Dashboard'); 

    //make sure it visible
    await expect(locators.dashboardLink).toBeVisible();

  
  });
  test('login success when inputing valid username and password and press enter key on password input', async ({page}) => {
    const locators = new LoginLocators(page);
   
     //fill inputs
    await locators.inputUsername.fill(account.username);
    await locators.inputPassword.fill(account.password);

     //locator submit button and click
     await locators.inputPassword.press('Enter');
     

     //Make sure the url to be right
     await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 
 
     //make sure it have text "Dashboard" 
     await expect(locators.dashboardLink).toHaveText('Dashboard'); 
 
     //make sure it visible
     await expect(locators.dashboardLink).toBeVisible();
    
  });
  test('login success when inputing valid username and password by pressing enter key on username input', async ({page}) => {
    const locators = new LoginLocators(page);

    //fill inputs
   await locators.inputUsername.fill(account.username);
   await locators.inputPassword.fill(account.password);

    //locator submit button and click
    await locators.inputUsername.press('Enter');
    
    //Make sure the url to be right
    expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 

    //make sure it have text "Dashboard" 
    await expect(locators.dashboardLink).toHaveText('Dashboard'); 

    //make sure it visible
    await expect(locators.dashboardLink).toBeVisible();
   
 });
});

test.describe('Login failed', () => {
  test('login failed when leaving username and password input are empty', async ({ page }) => {
    const locators = new LoginLocators(page);
    //just click submit button
    await locators.submitButton.click();

    // make sure username error is visible
    await expect(locators.errorUsername).toBeVisible();
    // make sure password error is visible
    await expect(locators.errorPassword).toBeVisible();

  });

  test('login failed when inputing only user name', async ({ page }) => {
    const locators = new LoginLocators(page);

     //fill inputs
    await locators.inputUsername.fill(account.username);

    //click submit button
    await locators.submitButton.click();

    // make sure password error is visible
    await expect(locators.errorPassword).toBeVisible();

  });

  test('login failed when inputing only password', async ({ page }) => {
    const locators = new LoginLocators(page);

   await locators.inputPassword.fill(account.password);

    //click submit button
    await locators.submitButton.click();

     // make sure username error is visible
     await expect(locators.errorUsername).toBeVisible();

  });

  test('login failed when inputing incorrect username and password', async ({ page }) => {
    const locators = new LoginLocators(page);
   
    //fill with incorrect inputs
    await locators.inputPassword.fill(account.fake);
    await locators.inputUsername.fill(account.fake);

     //click submit button
     await locators.submitButton.click();

    await expect(locators.alertLocator).toBeVisible({
      timeout: 10000
    });

    await expect(locators.alertLocator).toHaveText('Invalid credentials');

 
   });
  
   test('login failed when inputing invalid password', async ({ page }) => {
    const locators = new LoginLocators(page);

    //fill with incorrect inputs
    await locators.inputUsername.fill(account.username);
    await locators.inputPassword.fill(account.fake);
    
     //click submit button
     await locators.submitButton.click();
     
    await expect(locators.alertLocator).toBeVisible({
      timeout: 10000
    });
    
    await expect(locators.alertLocator).toHaveText('Invalid credentials');
 
   });

   test('login failed when inputing invalid username', async ({ page }) => {
    const locators = new LoginLocators(page);

    //fill with incorrect inputs
    await locators.inputUsername.fill(account.fake);
    await locators.inputPassword.fill(account.password);
   
     //click submit button
     await locators.submitButton.click();
     
    await expect(locators.alertLocator).toBeVisible({
      timeout: 10000
    });
    await expect(locators.alertLocator).toHaveText('Invalid credentials');
 
   });
   
})