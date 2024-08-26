import { expect, type Locator, type Page } from '@playwright/test';
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // async login(adminAccount: { username: string; password: string }) {
    //   await this.fillLogin(adminAccount);
    //   await recruitmentPage.loginButton.click();
    // }
    // async fillLogin(adminAccount: { username: string; password: string }) {
    //   for (const prop in adminAccount) {
    //     await this.page.locator(loginPageLocator[`input${prop}`]).fill(adminAccount[prop]);
    //   }
    // }

    async waitForElementVisible(locator, timeout) {
       await expect(locator.waitFor({ state: "visible", timeout }));
      }
    async elementShouldContainText(
      locator: Locator,
      expectedText: string,
      timeout: number = 10000
    ): Promise<void> {
      await expect(locator).toHaveText(expectedText, { timeout });
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
        if (typeof locator === "string") {
          await this.page.locator(locator).press(key, options);
        } else {
          await locator.press(key, options);
        }
      }
    async elementAttributeShouldContain(
      locator: Locator,
      expectedText: string,
      attribute: string,
    ): Promise<void> {
      await expect(locator).toHaveAttribute(attribute, expectedText);
    }
    
    async elementValueShouldContain(
      locator: Locator,
      expectedText: string,
      timeout: number = 10000
    ): Promise<void> {
      await expect(locator).toHaveValue(expectedText, {timeout});
    }
    
    async elementShouldEmpty(
      locator: Locator,
      timeout: number = 10000
    ): Promise<void> {
      await expect(locator).toBeEmpty({timeout});
    }
    
    async addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    
    async subtractDays(date, days) {
      return this.addDays(date, -days);
    }
}