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
} from "../../../../helpers/importRecruitment";
import {
  detailCandidateName,
  searchRecord,
} from "../../../../pom/recruitmentPage";

var loginPage: LoginPage;
var recruitmentPage: RecruitmentPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  recruitmentPage = new RecruitmentPage(page);
  await page.goto("./auth/login");
  // login
  await loginPage.login(
    account.adminAccount.username,
    account.adminAccount.password
  );
  await addRecord(page, recruitmentPage, ValidUser);
  await searchRecord(ValidUser, page, recruitmentPage);
});

test.describe("Row option suite", () => {
  test("Show candidate detail by clicking on eye icon", async ({ page }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    const rowName = fullName.locator(recruitmentPage.eye);
    await rowName.click();
    await expect(recruitmentPage.appStage).toBeVisible();
    //expect them thông tin -> đó là việc của các bước dưới.
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Document download success when click on download button", async ({
    page,
  }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    const rowName = fullName.locator(recruitmentPage.downloadIcon);
    const downloadPromise = page.waitForEvent("download");
    await rowName.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("correct.docx");
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });
});
test.describe("Detail Candidate Suite", () => {
  test.beforeEach(async ({ page }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    const rowName = fullName.locator(recruitmentPage.eye);
    await rowName.click();
  });

  test("Application Stage and Candidate Profile should be display corresponding data", async ({
    page,
  }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    const dtFullName = detailCandidateName(page, ValidUser);
    await expect(dtFullName).toBeVisible();
    await expect(recruitmentPage.dtVacancy).toBeVisible();
    await expect(recruitmentPage.inputFirstName).toHaveValue(
      ValidUser.FirstName
    );
    await expect(recruitmentPage.inputMiddleName).toHaveValue(
      ValidUser.MiddleName
    );
    await expect(recruitmentPage.inputLastName).toHaveValue(ValidUser.LastName);
    await expect(recruitmentPage.dtJVacancy).toBeVisible();
    await expect(recruitmentPage.inputEmail).toHaveValue(ValidUser.Email);
    await expect(recruitmentPage.contactNumber).toHaveValue(
      ValidUser.ContactNumber
    );
    await expect(recruitmentPage.fileName).toHaveText("correct.docx");
    await expect(recruitmentPage.keywords).toHaveValue(ValidUser.Keywords);
    await expect(recruitmentPage.dateOfApp).toHaveValue(ValidUser.DateOfApp);
    await expect(recruitmentPage.notes).toHaveValue(ValidUser.Notes);
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("User can shortlist a Application Initiated Candidate", async ({
    page,
  }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.shortlistButton.click();
    await expect(recruitmentPage.h6).toBeVisible();
    await expect(recruitmentPage.h6).toHaveText("Shortlist Candidate");
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("User can reject a Application Initiated Candidate", async ({
    page,
  }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.rejectButton.click();
    await expect(recruitmentPage.h6).toBeVisible();
    await expect(recruitmentPage.h6).toHaveText("Reject Candidate");
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });
});
