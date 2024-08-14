import { Locator, Page } from "@playwright/test";

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
