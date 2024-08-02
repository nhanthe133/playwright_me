import { Page } from '@playwright/test';  
import { LoginPageLocator } from '../locators/loginPageLocators';
export class LoginLocators {  
    private page: Page; 

    constructor(page: Page) {  
        this.page = page;  
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