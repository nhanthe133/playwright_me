import { Locator, Page } from '@playwright/test';
import { LoginPageLocator } from '../locators/loginPageLocators';
export class LoginLocators {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(username?: string, password?: string, _login: boolean = true) {
        if (username) {
            await this.inputUsername.fill(username)
        }
        if (password) {
            await this.inputPassword.fill(password)
        }

        if (_login) {
            await this.submitButton.click()
        }

    }

    async pressKeyOnLocator(locator: Locator | string, key:string, options?:{
        delay?: number;
        noWaitAfter?: boolean;
        timeout?: number;
    }){
        if (locator instanceof String){
            await this.page.locator(locator as string).press(key, options)
        }else{
            await (locator as Locator).press(key, options)
        }
    }

    get inputUsername() {
        return this.page.locator(LoginPageLocator.inputUsername);
    }

    get inputPassword() {
        return this.page.locator(LoginPageLocator.inputPassword);
    }

    get submitButton() {
        return this.page.locator(LoginPageLocator.submitButton);
    }

    get dashboardLink() {
        return this.page.getByRole('link', { name: 'Dashboard' });
    }

    get errorUsername() {
        return this.page.locator('//input[@name="username"]/parent::div/following-sibling::span');
    }

    get errorPassword() {
        return this.page.locator('//input[@name="password"]/parent::div/following-sibling::span');
    }

    get alertLocator() {
        return this.page.locator('//p[contains(@class,"oxd-alert-content-text")]');
    }

}