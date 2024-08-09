
import { expect } from "@playwright/test";
export async function deleteRecord(rowLocator, page, recruitmentPage) {
    const trashButton = rowLocator.locator("button:has(i.oxd-icon.bi-trash)");
    await trashButton.waitFor({ state: "visible" });
    await trashButton.click();
    
    const deleteButton = page.locator("button:has(i.oxd-icon.bi-trash.oxd-button-icon)");
    await deleteButton.click();
    
    await expect(recruitmentPage.successMessage).toBeVisible();
  }
  