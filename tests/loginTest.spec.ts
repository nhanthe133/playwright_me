import { test, expect} from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import account from "../data/account.json";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
});

test.describe("Login success", () => {
  test("@TC1 login success when inputing valid username and password", async ({
    page,
  }) => {
    await loginPage.login(
      account.adminAccount.username,
      account.adminAccount.password
    );
    await expect(page.url()).toBe(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
    await expect(loginPage.dashboardLink).toHaveText("Dashboard");
    await expect(loginPage.dashboardLink).toBeVisible();
  });

  test("login success when inputing valid username and password and press enter key on password input", async ({
    page,
  }) => {
    await loginPage.login(
      account.adminAccount.username,
      account.adminAccount.password,
      false
    );
    await loginPage.pressKeyOnLocator(loginPage.inputPassword, "Enter");
    await expect(page.url()).toBe(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
    await expect(loginPage.dashboardLink).toHaveText("Dashboard");
    await expect(loginPage.dashboardLink).toBeVisible();
  });

  test("login success when inputing valid username and password by pressing enter key on username input", async ({
    page,
  }) => {
    await loginPage.login(
      account.adminAccount.username,
      account.adminAccount.password,
      false
    );
    await loginPage.pressKeyOnLocator(loginPage.inputUsername, "Enter");
    expect(page.url()).toBe(
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    );
    await expect(loginPage.dashboardLink).toHaveText("Dashboard");
    await expect(loginPage.dashboardLink).toBeVisible();
  });
});

test.describe("Login failed", () => {
  test("login failed when leaving username and password input are empty", async () => {
    await loginPage.submitButton.click();
    await expect(loginPage.errorUsername).toBeVisible();
    await expect(loginPage.errorPassword).toBeVisible();
  });

  test("login failed when inputing only user name", async () => {
    await loginPage.login(account.adminAccount.username);
    await expect(loginPage.errorPassword).toBeVisible();
  });

  test("login failed when inputing only password", async () => {
    await loginPage.login(undefined, account.adminAccount.password);
    await expect(loginPage.errorUsername).toBeVisible();
  });

  test("login failed when inputing incorrect username and password", async () => {
    await loginPage.login(
      account.invalidAccount.username,
      account.invalidAccount.password
    );
    await expect(loginPage.alertLocator).toBeVisible({
      timeout: 10000,
    });
    await expect(loginPage.alertLocator).toHaveText("Invalid credentials");
  });

  test("login failed when inputing invalid password", async () => {
    await loginPage.login(
      account.adminAccount.username,
      account.invalidAccount.password
    );
    await expect(loginPage.alertLocator).toBeVisible({
      timeout: 10000,
    });
    await expect(loginPage.alertLocator).toHaveText("Invalid credentials");
  });

  test("login failed when inputing invalid username", async () => {
    await loginPage.login(
      account.invalidAccount.username,
      account.adminAccount.password
    );
    await expect(loginPage.alertLocator).toBeVisible({
      timeout: 10000,
    });
    await expect(loginPage.alertLocator).toHaveText("Invalid credentials");
  });
});
