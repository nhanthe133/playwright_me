import { Locator, Page } from "@playwright/test";
import loginPageLocator from "../locators/loginPageLocator.json";
import { pressKeyOnLocator } from "../helpers/utils";
export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username?: string, password?: string, _login: boolean = true) {
    if (username) {
      await this.inputUsername.fill(username);
    }
    if (password) {
      await this.inputPassword.fill(password);
    }
    if (_login) {
      await this.submitButton.click();
    }
  }
  async pressKeyOnLocator(
    locator: Locator | string,
    key: string,
    options?: {
      delay?: number;
      noWaitAfter?: boolean;
      timeout?: number;
    }
  ) {
    await pressKeyOnLocator(this.page, locator, key, options);
  }

  get inputUsername() {
    return this.page.locator(loginPageLocator.inputUsername);
  }

  get inputPassword() {
    return this.page.locator(loginPageLocator.inputPassword);
  }

  get submitButton() {
    return this.page.locator(loginPageLocator.submitButton);
  }

  get dashboardLink() {
    return this.page.getByRole("link", { name: "Dashboard" });
  }

  get errorUsername() {
    return this.page.locator(loginPageLocator.errorUsername);
  }

  get errorPassword() {
    return this.page.locator(loginPageLocator.errorPassword);
  }

  get alertLocator() {
    return this.page.locator(loginPageLocator.alertLocator);
  }
}
