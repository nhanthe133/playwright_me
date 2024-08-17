import { test, expect, type Page } from "@playwright/test";

import {
  LoginPage,
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  fullCandidateName,
  account,
  ValidUser,
  getHiringName,
  createValidUser,
} from "../../../../helpers/importRecruitment";
import { searchRecord } from "../../../../pom/recruitmentPage";

var loginPage: LoginPage;
var recruitmentPage: RecruitmentPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  recruitmentPage = new RecruitmentPage(page);
  await page.goto("./auth/login");
  await loginPage.login(
    account.adminAccount.username,
    account.adminAccount.password
  );
  await addRecord(page, recruitmentPage, ValidUser);
  await recruitmentPage.recruitmentLink.click();
  await searchRecord(ValidUser, page, recruitmentPage);
});

test.describe("Delete Candidate Suite", () => {
  test("User can cancel delete record", async ({ page }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click();
    await recruitmentPage.cancelDelete.click();
    await expect(fullName).toBeVisible();

    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
    await expect(recruitmentPage.successMessage).toBeVisible();
  });

  test("User can cancel delete multiple records", async ({ page }) => {
    const editUser = createValidUser();
    await addRecord(page, recruitmentPage, editUser);
    await recruitmentPage.recruitmentLink.click();

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();

    const fullNameOne = fullNameCombiner(page, ValidUser);
    const rowNameOne = fullNameOne.locator(recruitmentPage.checkBox); // nấu locator cho rowname checkbox
    await rowNameOne.click(); // nhấp vào checkbox

    const fullNameTwo = fullNameCombiner(page, editUser);
    const rowNameTwo = fullNameTwo.locator(recruitmentPage.checkBox);
    await rowNameTwo.click(); // nhấp vào checkbox

    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.cancelDelete.click();
    await expect(fullNameOne).toBeVisible();
    await expect(fullNameTwo).toBeVisible();

    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    await expect(recruitmentPage.successMessage).toBeVisible();
  });

  test("User can delete multiple records", async ({ page }) => {
    const editUser = createValidUser();
    await addRecord(page, recruitmentPage, editUser);
    await recruitmentPage.recruitmentLink.click();

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();

    const fullNameOne = fullNameCombiner(page, ValidUser);
    const rowNameOne = fullNameOne.locator(recruitmentPage.checkBox);
    await rowNameOne.click();

    const fullNameTwo = fullNameCombiner(page, editUser);
    const rowNameTwo = fullNameTwo.locator(recruitmentPage.checkBox);
    await rowNameTwo.click();

    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    await expect(recruitmentPage.successMessage).toBeVisible();
  });

  test("User can delete one record", async ({ page }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click(); // nhấp vào thùng rác
    await recruitmentPage.ultimateDelete.click();
    await expect(recruitmentPage.successMessage).toBeVisible();
  });
});
