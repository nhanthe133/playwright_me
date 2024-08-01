import { test, expect, type Page } from '@playwright/test';

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

    const newUsername = page.locator('input[name="username"]');

    // const newUsername = page.getByPlaceholder('Username'); 

    const newPassword = page.locator('input[name="password"]');

    await newUsername.fill(DATASET[0]);
    await newPassword.fill(DATASET[1]);

    await page.locator('button[type="submit"]').click();

    await expect(page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'); 

    const dashboard = page.getByRole('link', { name: 'Dashboard' })

    await expect(dashboard).toHaveText('Dashboard'); 
    await expect(dashboard).toBeVisible();

  
  })
} )