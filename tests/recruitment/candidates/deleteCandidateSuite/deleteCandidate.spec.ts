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
  await RecruitmentResource.addRecord(page, recruitmentPage, RecruitmentResource.ValidUser);
  await recruitmentPage.recruitmentLink.click();
  await RecruitmentResource.searchRecord(RecruitmentResource.ValidUser, page, recruitmentPage);
});

test.describe("Delete Candidate Suite", () => {
  test("User can cancel delete record", async ({ page }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click();
    await recruitmentPage.cancelDelete.click();
    // await expect(fullName).toBeVisible();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);

    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
    // await expect(recruitmentPage.successMessage).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);
  });

  test("User can cancel delete multiple records", async ({ page }) => {
    const editUser = RecruitmentResource.createValidUser();
    await RecruitmentResource.addRecord(page, recruitmentPage, editUser);
    await recruitmentPage.recruitmentLink.click();

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = RecruitmentResource.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();

    const fullNameOne = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const rowNameOne = fullNameOne.locator(recruitmentPage.checkBox); // nấu locator cho rowname checkbox
    await rowNameOne.click(); // nhấp vào checkbox

    const fullNameTwo = RecruitmentResource.fullNameCombiner(page, editUser);
    const rowNameTwo = fullNameTwo.locator(recruitmentPage.checkBox);
    await rowNameTwo.click(); // nhấp vào checkbox

    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.cancelDelete.click();
    // await expect(fullNameOne).toBeVisible();
    await RecruitmentResource.waitForElementVisible(fullNameOne, 10000);
    // await expect(fullNameTwo).toBeVisible();
    await RecruitmentResource.waitForElementVisible(fullNameTwo, 10000);


    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    // await expect(recruitmentPage.successMessage).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);
  });

  test("User can delete multiple records", async ({ page }) => {
    const editUser = RecruitmentResource.createValidUser();
    await RecruitmentResource.addRecord(page, recruitmentPage, editUser);
    await recruitmentPage.recruitmentLink.click();

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = RecruitmentResource.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();

    const fullNameOne = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const rowNameOne = fullNameOne.locator(recruitmentPage.checkBox);
    await rowNameOne.click();

    const fullNameTwo = RecruitmentResource.fullNameCombiner(page, editUser);
    const rowNameTwo = fullNameTwo.locator(recruitmentPage.checkBox);
    await rowNameTwo.click();

    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    // await expect(recruitmentPage.successMessage).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);
  });

  test("User can delete one record", async ({ page }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click(); // nhấp vào thùng rác
    await recruitmentPage.ultimateDelete.click();
    // await expect(recruitmentPage.successMessage).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);

  });
});
