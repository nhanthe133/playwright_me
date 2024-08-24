import { Locator, Page, expect } from "@playwright/test";

export async function waitForElementVisible(locator, timeout) {
    await locator.waitFor({ state: "visible", timeout });
  }

export async function elementShouldContainText(
  locator: Locator,
  expectedText: string,
  timeout: number = 10000
): Promise<void> {
  await expect(locator).toHaveText(expectedText, { timeout });
}

  
export async function pressKeyOnLocator(
    page: Page,
    locator: Locator | string,
    key: string,
    options?: {
      delay?: number;
      noWaitAfter?: boolean;
      timeout?: number;
    }
  ) {
    if (typeof locator === "string") {
      await page.locator(locator).press(key, options);
    } else {
      await locator.press(key, options);
    }
  }

//1. locator
//2. value
//4. toHave [state]

// Demo attribute attemp 1
export async function elementAttributeShouldContain(
  locator: Locator,
  expectedText: string,
  attribute: string,
): Promise<void> {
  await expect(locator).toHaveAttribute(attribute, expectedText);
}

export async function elementValueShouldContain(
  locator: Locator,
  expectedText: string,
  timeout: number = 10000
): Promise<void> {
  await expect(locator).toHaveValue(expectedText, {timeout});
}

export async function elementShouldEmpty(
  locator: Locator,
  timeout: number = 10000
): Promise<void> {
  await expect(locator).toBeEmpty({timeout});
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function subtractDays(date, days) {
  return addDays(date, -days);
}
