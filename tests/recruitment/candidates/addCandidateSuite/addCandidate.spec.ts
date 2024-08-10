import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../../../../pom/loginPage";
import { RecruitmentPage } from "../../../../pom/recruitmentPage";
import account from "../../../../data/account.json";
import { deleteRecord } from '../../../../pom/recruitmentPom/deleteRecord';
import {
  createValidUser,
  createInvalidEMail,
  createInvalidDate,
} from "../../../../data/fakeData";
import { fullName } from "../../../../pom/recruitmentPom/fullName";
import { halfName } from "../../../../pom/recruitmentPom/halfName";

import ValidUser from "../../../../data/fakeData";
import recruirmenPageLocator from "../../../../locators/recruitmentPageLocator.json";

var loginPage: LoginPage;
var recruitmentPage: RecruitmentPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  recruitmentPage = new RecruitmentPage(page);
  await page.goto(
    "./auth/login"
  );
  await loginPage.login(
    account.adminAccount.username,
    account.adminAccount.password
  );
  await recruitmentPage.recruitmentLink.click();
});

test("Showing Recruitment page when clicking on Recruitment button", async ({
  page,
}) => {
  await expect(recruitmentPage.recruitmentLink).toBeVisible();
  // await expect(page.url()).toBe(
  //   "/recruitment/viewCandidates"
  // );
  await expect(page).toHaveURL('/web/recruitment/viewCandidates'); 
  await expect(recruitmentPage.recruitmentHeader).toBeVisible();
});

test.describe("Add Candidate Suite", () => {
  test.beforeEach(async ({ page }) => {
    recruitmentPage = new RecruitmentPage(page);
    await recruitmentPage.addButton.click();
  });

  test("Add Candidate success when inputing all the field", async ({ page }) => {
    const formattedDate = ValidUser.dateOfApp.split("T")[0];
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();

    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles(
      "files/correct.docx"
    );

    await recruitmentPage.inputFull(
      ValidUser.firstName,
      ValidUser.lastName,
      ValidUser.email,
      ValidUser.middleName,
      ValidUser.contactNumber,
      ValidUser.keywords,
      formattedDate,
      ValidUser.notes
    );
    await expect(recruitmentPage.successMessage).toBeVisible();
    await page.waitForTimeout(3000);
    await expect(recruitmentPage.appStage).toBeVisible();

    await recruitmentPage.recruitmentLink.click();
    const rowLocator = fullName(page, ValidUser);
    await deleteRecord(rowLocator, page, recruitmentPage);
  });

  test("Add Candidate success when inputing required fields only", async ({page}) => {
    await recruitmentPage.inputRequired(
      ValidUser.firstName,
      ValidUser.lastName,
      ValidUser.email
    );
    await expect(recruitmentPage.successMessage).toBeVisible();
    await page.waitForTimeout(3000);
    await expect(recruitmentPage.appStage).toBeVisible();

    await recruitmentPage.recruitmentLink.click();
    const rowLocator = halfName(page, ValidUser);
    await deleteRecord(rowLocator, page, recruitmentPage);
  });

  test("Failed to add candidate when do not input required fields", async ({
    page
  }) => {
    await recruitmentPage.submitAdd.click();
    await expect(recruitmentPage.errorFirstName).toBeVisible();
    await expect(recruitmentPage.errorLastName).toBeVisible();
    await expect(recruitmentPage.errorEmail).toBeVisible();
  });

  test("Validation alert should be show when input invalid email address", async ({page}) => {
    const email = createInvalidEMail();
    await recruitmentPage.inputInvalidEmail(email.email);
    await expect(recruitmentPage.errorEmail).toBeVisible();
    await expect(page.getByText("admin@example.com")).toBeVisible();
  });

  test("File size validation alert should be shown when upload file with size larger than 1MB", async ({page}) => {
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles(
      "files/oversize.mp4"
    );
    await expect(recruitmentPage.errorFile).toBeVisible();
    await expect(page.getByText("Attachment Size Exceeded")).toBeVisible(); // ko có gì khác nhau ở errorFile locator
  });

  test("File type not allowed validation alert should be shown when uploading invalid file type", async ({page}) => {
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles(
      "files/invalidtype.jpg"
    );
    await expect(recruitmentPage.errorFile).toBeVisible();
    await expect(page.getByText("File type not allowed")).toBeVisible(); // ko có gì khác nhau ở errorFile locator
  });

  test("Date format validation message should be shown when input invalid date format", async ({page}) => {
    const invalidDate = createInvalidDate();
    const formattedDate = invalidDate.dateOfApp.toISOString();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.inputInvalidDate(formattedDate);
    await expect(recruitmentPage.errorDate).toBeVisible();
    await expect(page.getByText("yyyy-dd-mm")).toBeVisible();
  });

  test("Navigation to Recruitment page when clicking the cancel button", async ({page}) => {
    await recruitmentPage.cancelButton.click();
    await expect(page).toHaveURL('/web/recruitment/viewCandidates');
    await expect(recruitmentPage.recruitmentHeader).toBeVisible();
  });
});
