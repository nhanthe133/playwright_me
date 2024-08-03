import { test, expect, type Page } from '@playwright/test';
import { LoginLocators } from '../pom/loginpage';
import account from '../data/account.json'

var loginLocators: LoginLocators;

test.beforeEach(async ({ page }) => {
  loginLocators = new LoginLocators(page)
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});

test.describe('Login success', () => {

  test('@TC1 login success when inputing valid username and password', async ({ page }) => {
    await loginLocators.login(account.adminAccount.username, account.adminAccount.password)
    await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(loginLocators.dashboardLink).toHaveText('Dashboard');
    await expect(loginLocators.dashboardLink).toBeVisible();
  });

  test('login success when inputing valid username and password and press enter key on password input', async ({ page }) => {
    await loginLocators.login(account.adminAccount.username, account.adminAccount.password, false)
    await loginLocators.pressKeyOnLocator(loginLocators.inputPassword, "Enter")
    await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(loginLocators.dashboardLink).toHaveText('Dashboard');
    await expect(loginLocators.dashboardLink).toBeVisible();
  });

  test('login success when inputing valid username and password by pressing enter key on username input', async ({ page }) => {
    await loginLocators.login(account.adminAccount.username, account.adminAccount.password, false)
    await loginLocators.pressKeyOnLocator(loginLocators.inputUsername, "Enter")
    expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(loginLocators.dashboardLink).toHaveText('Dashboard');
    await expect(loginLocators.dashboardLink).toBeVisible();
  });
});

test.describe('Login failed', () => {
  test('login failed when leaving username and password input are empty', async ({ page }) => {
    await loginLocators.submitButton.click();
    await expect(loginLocators.errorUsername).toBeVisible();
    await expect(loginLocators.errorPassword).toBeVisible();
  });
  
  test('login failed when inputing only user name', async ({ page }) => {
    await loginLocators.login(account.adminAccount.username)
    await expect(loginLocators.errorPassword).toBeVisible();
  });

  test('login failed when inputing only password', async ({ page }) => {
    await loginLocators.login(undefined, account.adminAccount.password);
    await expect(loginLocators.errorUsername).toBeVisible();
  });

  test('login failed when inputing incorrect username and password', async ({ page }) => {
    await loginLocators.login(account.invalidAccount.username, account.invalidAccount.password);
    await expect(loginLocators.alertLocator).toBeVisible({
      timeout: 10000
    });
    await expect(loginLocators.alertLocator).toHaveText('Invalid credentials');
  });

  test('login failed when inputing invalid password', async ({ page }) => {
    await loginLocators.login(account.adminAccount.username, account.invalidAccount.password);
    await expect(loginLocators.alertLocator).toBeVisible({
      timeout: 10000
    });
    await expect(loginLocators.alertLocator).toHaveText('Invalid credentials');
  });

  test('login failed when inputing invalid username', async ({ page }) => {
    await loginLocators.login(account.invalidAccount.username, account.adminAccount.password);
    await expect(loginLocators.alertLocator).toBeVisible({
      timeout: 10000
    });
    await expect(loginLocators.alertLocator).toHaveText('Invalid credentials');
  });
})