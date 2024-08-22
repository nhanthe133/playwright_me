import { test } from "@playwright/test";
import * as RecruitmentResource from "../../../../helpers/recruitmentResource";

let loginPage: RecruitmentResource.LoginPage;
let recruitmentPage: RecruitmentResource.RecruitmentPage;
test.beforeEach(async ({ page }) => {
  loginPage = new RecruitmentResource.LoginPage(page);
  recruitmentPage = new RecruitmentResource.RecruitmentPage(page);
  await page.goto("./auth/login");
  await loginPage.login(
    RecruitmentResource.account.adminAccount.username,
    RecruitmentResource.account.adminAccount.password
  );
  await recruitmentPage.addRecord(RecruitmentResource.ValidUser);
  await recruitmentPage.recruitmentLink.click();
  await recruitmentPage.searchRecord(RecruitmentResource.ValidUser);
});

test.describe("@XC Delete Candidate Suite", () => {
  test("@TC2 User can cancel delete record", async ({ page }) => {
    const fullName = recruitmentPage.fullNameCombiner(RecruitmentResource.ValidUser);
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click();
    await recruitmentPage.cancelDelete.click();
    // await expect(fullName).toBeVisible();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    // await RecruitmentResource.betterDeleteRecord(RecruitmentResource.ValidUser, page, recruitmentPage);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("User can cancel delete multiple records", async ({ page }) => {
    const editUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(editUser);
    await recruitmentPage.recruitmentLink.click();
    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = recruitmentPage.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();
    await recruitmentPage.submitButton.click();

    const fullNameOne = recruitmentPage.fullNameCombiner(RecruitmentResource.ValidUser);
    const rowNameOne = fullNameOne.locator(recruitmentPage.checkBox); // nấu locator cho rowname checkbox
    await rowNameOne.click(); // nhấp vào checkbox

    const fullNameTwo = recruitmentPage.fullNameCombiner(editUser);
    const rowNameTwo = fullNameTwo.locator(recruitmentPage.checkBox);
    await rowNameTwo.click(); // nhấp vào checkbox

    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.cancelDelete.click();

    await RecruitmentResource.waitForElementVisible(fullNameOne, 10000);
    await RecruitmentResource.waitForElementVisible(fullNameTwo, 10000);
    
    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);
  });

  test("User can delete multiple records", async ({ page }) => {
    const editUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(editUser);
    await recruitmentPage.recruitmentLink.click();

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = recruitmentPage.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();

    const fullNameOne = recruitmentPage.fullNameCombiner(RecruitmentResource.ValidUser);
    const rowNameOne = fullNameOne.locator(recruitmentPage.checkBox);
    await rowNameOne.click();

    const fullNameTwo = recruitmentPage.fullNameCombiner(editUser);
    const rowNameTwo = fullNameTwo.locator(recruitmentPage.checkBox);
    await rowNameTwo.click();

    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);
  });

  test("User can delete one record", async ({ page }) => {
    const fullName = recruitmentPage.fullNameCombiner(RecruitmentResource.ValidUser);
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click(); // nhấp vào thùng rác
    await recruitmentPage.ultimateDelete.click();
    // await expect(recruitmentPage.successMessage).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);

  });
});
