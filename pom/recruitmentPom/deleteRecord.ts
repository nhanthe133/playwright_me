import { RecruitmentPage } from "../recruitmentPage";
import { expect } from "@playwright/test";
var recruitmentPage: RecruitmentPage;
export async function deleteRecord(rowLocator:any, page:any, recruitmentPage:any) {
    const rowTrash = rowLocator.locator(recruitmentPage.trashButton);
    await rowTrash.waitFor({ state: "visible" });
    await rowTrash.click();
    await page.waitForTimeout(3000);
    await recruitmentPage.deleteButton.click();
    await expect(recruitmentPage.successMessage).toBeVisible();
  }
  