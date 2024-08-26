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
    await loginPage.waitForElementVisible(loginPage.dashboardLink, 10000);
    await loginPage.elementShouldContainText(
      loginPage.dashboardLink,
      "Dashboard",
      15000
    );
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
    await loginPage.elementShouldContainText(
      loginPage.dashboardLink,
      "Dashboard",
      15000
    );
    await loginPage.waitForElementVisible(loginPage.dashboardLink, 10000);

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

    await loginPage.elementShouldContainText(
      loginPage.dashboardLink,
      "Dashboard",
      15000
    );
    await loginPage.waitForElementVisible(loginPage.dashboardLink, 10000);

  });
});

test.describe("Login failed", () => {
  test("@LF01 login failed when leaving username and password input are empty", async () => {
    await loginPage.submitButton.click();
    await loginPage.waitForElementVisible(loginPage.errorUsername, 10000);
    await loginPage.waitForElementVisible(loginPage.errorPassword, 10000);

  });

  test("login failed when inputing only user name", async () => {
    await loginPage.login(account.adminAccount.username);
    await loginPage.waitForElementVisible(loginPage.errorPassword, 10000);
  });

  test("login failed when inputing only password", async () => {
    await loginPage.login(undefined, account.adminAccount.password);
    
    await loginPage.waitForElementVisible(loginPage.errorUsername, 10000);
  });

  test("login failed when inputing incorrect username and password", async () => {
    await loginPage.login(
      account.invalidAccount.username,
      account.invalidAccount.password
    );
    await loginPage.waitForElementVisible(loginPage.alertLocator, 10000);

    
    // await expect(loginPage.alertLocator).toHaveText("Invalid credentials");
    await loginPage.elementShouldContainText(
      loginPage.alertLocator,
      "Invalid credentials",
      15000
    );
  });

  test("login failed when inputing invalid password", async () => {
    await loginPage.login(
      account.adminAccount.username,
      account.invalidAccount.password
    );
    await loginPage.waitForElementVisible(loginPage.alertLocator, 10000);

    await loginPage.elementShouldContainText(
      loginPage.alertLocator,
      "Invalid credentials",
      15000
    );
  });

  test("login failed when inputing invalid username", async () => {
    await loginPage.login(
      account.invalidAccount.username,
      account.adminAccount.password
    );
    await loginPage.waitForElementVisible(loginPage.alertLocator, 10000);
   
    await loginPage.elementShouldContainText(
      loginPage.alertLocator,
      "Invalid credentials",
      15000
    );
  });
});
