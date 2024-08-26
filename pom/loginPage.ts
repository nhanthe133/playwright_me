import loginPageLocator from "../locators/loginPageLocator.json";
import { BasePage } from "../helpers/basePage";
export class LoginPage extends BasePage {
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
