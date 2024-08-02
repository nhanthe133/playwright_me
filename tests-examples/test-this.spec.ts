import { test, expect, type Page } from '@playwright/test';  
import { LoginLocators } from '../pom/loginpage';

test.beforeEach(async ({ page }) => {  
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');  
});  

const DATASET = [  
    'Admin',  
    'admin123',  
    'wrongtext'  
] as const;  

test.describe('Login success', () => {  
    test('login success when inputing valid username and password', async ({ page }) => {  
        const locators = new LoginLocators(page);  

        await locators.inputUsername.fill(DATASET[0]);  
        await locators.inputPassword.fill(DATASET[1]);  
        await locators.submitButton.click();  

        await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');  
        await expect(locators.dashboardLink).toHaveText('Dashboard');  
        await expect(locators.dashboardLink).toBeVisible();  
    });  

    test('login success when inputing valid username and password and press enter key on password input', async ({ page }) => {  
        const locators = new LoginLocators(page);  

        await locators.inputUsername.fill(DATASET[0]);  
        await locators.inputPassword.fill(DATASET[1]);  
        await locators.inputPassword.press('Enter');  

        await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');  
        await expect(locators.dashboardLink).toHaveText('Dashboard');  
        await expect(locators.dashboardLink).toBeVisible();  
    });  

    test('login success when inputing valid username and password by pressing enter key on username input', async ({ page }) => {  
        const locators = new LoginLocators(page);  

        await locators.inputUsername.fill(DATASET[0]);  
        await locators.inputPassword.fill(DATASET[1]);  
        await locators.inputUsername.press('Enter');  

        await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');  
        await expect(locators.dashboardLink).toHaveText('Dashboard');  
        await expect(locators.dashboardLink).toBeVisible();  
    });  
});