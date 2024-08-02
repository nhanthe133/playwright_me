import { test, expect, type Page } from '@playwright/test';
import { LoginLocators } from '../pom/loginpage';
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

    //create inputUsername locator
    // const inputUsername = page.locator('input[name=username]');
    // const inputUsername = page.getByPlaceholder('Username'); 

    //create inputPassword locator
    // const inputPassword = page.locator('input[name=password]');

    //fill inputs
    await locators.inputUsername.fill(DATASET[0]);
    await locators.inputPassword.fill(DATASET[1]);

    //locator submit button and click
    await locators.submitButton.click();

    //Make sure the url to be right
    await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 

    //locator the dashboard link
    // const dashboard = page.getByRole('link', { name: 'Dashboard' })

    //make sure it have text "Dashboard" 
    await expect(locators.dashboardLink).toHaveText('Dashboard'); 

    //make sure it visible
    await expect(locators.dashboardLink).toBeVisible();

  
  });
  test('login success when inputing valid username and password and press enter key on password input', async ({page}) => {
    const locators = new LoginLocators(page);
     //create inputUsername locator
    //  const inputUsername = page.locator('input[name=username]');
     // const inputUsername = page.getByPlaceholder('Username'); 
 
     //create inputPassword locator
    //  const inputPassword = page.locator('input[name=password]');

     //fill inputs
    await locators.inputUsername.fill(DATASET[0]);
    await locators.inputPassword.fill(DATASET[1]);

     //locator submit button and click
     await locators.inputPassword.press('Enter');
     

     //Make sure the url to be right
     await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 
 
     //locator the dashboard link
    //  const dashboard = page.getByRole('link', { name: 'Dashboard' })
 
     //make sure it have text "Dashboard" 
     await expect(locators.dashboardLink).toHaveText('Dashboard'); 
 
     //make sure it visible
     await expect(locators.dashboardLink).toBeVisible();
    
  });
  test('login success when inputing valid username and password by pressing enter key on username input', async ({page}) => {
    const locators = new LoginLocators(page);
    //create inputUsername locator
    // const inputUsername = page.locator('input[name=username]');
    // const inputUsername = page.getByPlaceholder('Username'); 

    //create inputPassword locator
    // const inputPassword = page.locator('input[name=password]');

    //fill inputs
   await locators.inputUsername.fill(DATASET[0]);
   await locators.inputPassword.fill(DATASET[1]);

    //locator submit button and click
    await locators.inputUsername.press('Enter');
    

    //Make sure the url to be right
    expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 

    //locator the dashboard link
    // const dashboard = page.getByRole('link', { name: 'Dashboard' })

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

    // await expect(page.getByText('Required').first()).toBeVisible();
    // await expect(page.getByText('Required').nth(1)).toBeVisible();

    //locator the error of username field
    // const errorUsername = page.locator('//input[@name="username"]/parent::div/following-sibling::span');
    //locator the error of password field
    // const errorPassword = page.locator('//input[@name="password"]/parent::div/following-sibling::span');

    // make sure username error is visible
    await expect(locators.errorUsername).toBeVisible();
    // make sure password error is visible
    await expect(locators.errorPassword).toBeVisible();

  });

  test('login failed when inputing only user name', async ({ page }) => {
    const locators = new LoginLocators(page);
    //create inputUsername locator
    // const inputUsername = page.locator('input[name=username]');

     //fill inputs
    await locators.inputUsername.fill(DATASET[0]);

    //click submit button
    await locators.submitButton.click();

    // const errorPassword = page.locator('//input[@name="password"]/parent::div/following-sibling::span');

    // make sure password error is visible
    await expect(locators.errorPassword).toBeVisible();

  });

  test('login failed when inputing only password', async ({ page }) => {
    const locators = new LoginLocators(page);
   //create inputPassword locator
  //  const inputPassword = await page.locator('input[name=password]');

   await locators.inputPassword.fill(DATASET[1]);

    //click submit button
    await locators.submitButton.click();

     //locator the error of username field
    //  const errorUsername = page.locator('//input[@name="username"]/parent::div/following-sibling::span');

     // make sure username error is visible
     await expect(locators.errorUsername).toBeVisible();

  });

  test('login failed when inputing incorrect username and password', async ({ page }) => {
    const locators = new LoginLocators(page);
    //create inputPassword locator
    // const inputPassword = page.locator('input[name=password]');

    //create inputUsername locator
    // const inputUsername = page.locator('input[name=username]');

    //fill with incorrect inputs
    await locators.inputPassword.fill(DATASET[2]);
    await locators.inputUsername.fill(DATASET[2]);

 
     //click submit button
     await locators.submitButton.click();
     
    // await expect(page.getByRole('alert')).toBeVisible();
    // const invalidCredentias = page.locator('//input[@name="password"]/parent::div/following-sibling::span');

    
    // await expect(page.getByText('Invalid credentials')).toBeVisible();
    // const alertLocator = '//p[contains(@class,"oxd-alert-content-text")]';
    
    // await expect(page.locator(alertLocator)).toBeVisible({
    //   timeout: 10000
    // });

    await expect(locators.alertLocator).toBeVisible({
      timeout: 10000
    });

    // const invalidCredentias = await page.locator(alertLocator);
    // const invalidCredentias = locators.alertLocator;
    // await expect(invalidCredentias).toHaveText('Invalid credentials');
    await expect(locators.alertLocator).toHaveText('Invalid credentials');

 
   });
  
   test('login failed when inputing invalid password', async ({ page }) => {
    const locators = new LoginLocators(page);
    //create inputPassword locator
    // const inputPassword = page.locator('input[name=password]');

    //create inputUsername locator
    // const inputUsername = page.locator('input[name=username]');

    //fill with incorrect inputs
    await locators.inputUsername.fill(DATASET[0]);
    await locators.inputPassword.fill(DATASET[2]);
    

 
     //click submit button
     await locators.submitButton.click();
     
    // await expect(page.getByRole('alert')).toBeVisible();
    // const invalidCredentias = page.locator('//input[@name="password"]/parent::div/following-sibling::span');

    
    // await expect(page.getByText('Invalid credentials')).toBeVisible();
    // const alertLocator = '//p[contains(@class,"oxd-alert-content-text")]';
    
    await expect(locators.alertLocator).toBeVisible({
      timeout: 10000
    });
    // const invalidCredentias = await page.locator(alertLocator);
    await expect(locators.alertLocator).toHaveText('Invalid credentials');
 
   });

   test('login failed when inputing invalid username', async ({ page }) => {
    const locators = new LoginLocators(page);
    //create inputPassword locator
    // const inputPassword = page.locator('input[name=password]');

    //create inputUsername locator
    // const inputUsername = page.locator('input[name=username]');

    //fill with incorrect inputs
    await locators.inputUsername.fill(DATASET[2]);
    await locators.inputPassword.fill(DATASET[1]);
   
     //click submit button
     await locators.submitButton.click();
     
    // await expect(page.getByRole('alert')).toBeVisible();
    // const invalidCredentias = page.locator('//input[@name="password"]/parent::div/following-sibling::span');

    
    // await expect(page.getByText('Invalid credentials')).toBeVisible();
    // const alertLocator = '//p[contains(@class,"oxd-alert-content-text")]';
    
    await expect(locators.alertLocator).toBeVisible({
      timeout: 10000
    });
    // const invalidCredentias = await page.locator(alertLocator);
    await expect(locators.alertLocator).toHaveText('Invalid credentials');
 
   });
   
})