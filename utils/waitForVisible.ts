export async function waitForElementVisible(locator, timeout = 30000) {
  await locator.waitFor({ state: "visible", timeout });
}
