import { test, expect, type Page } from "@playwright/test";

import {
  LoginPage,
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  halfNameCombiner,
  fullCandidateName,
  account,
  ValidUser,
  createValidUser,
  halfCandidateName,
  faker,
  createRequiredValidUser,
} from "../../../../helpers/importRecruitment";
import {
  fillTheFields,
  searchRecord,
  User,
  UserRequire,
} from "../../../../pom/recruitmentPage";

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
  await searchRecord(ValidUser, page, recruitmentPage);
  const fullName = fullNameCombiner(page, ValidUser);
  const rowName = fullName.locator(recruitmentPage.eye);
  await rowName.click();
  await recruitmentPage.switch.click();
});

test.describe("Edit Candidate Suite", () => {
  test("Edit Candidate Profile success when editing all the field", async ({
    page,
  }) => {
    const editUser = createValidUser();
    await recruitmentPage.replaceFile.click();
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles("files/resume.pdf");

    await recruitmentPage.dtJVacancy.click();
    await recruitmentPage.seniorQA.click();

    await recruitmentPage.inputFirstName.clear();
    await recruitmentPage.inputMiddleName.clear();
    await recruitmentPage.inputLastName.clear();
    await recruitmentPage.inputEmail.clear();
    await recruitmentPage.contactNumber.clear();
    await recruitmentPage.keywords.clear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.notes.clear();

    const fully: User = structuredClone(editUser);

    await fillTheFields(fully, page);
    await recruitmentPage.submitAdd.click();
    await recruitmentPage.confirmButton.click();

    await expect(recruitmentPage.successMessage).toBeVisible();
    //expect hell:
    await expect(recruitmentPage.dtJVacancy).toHaveText("Senior QA Lead");
    await expect(recruitmentPage.inputFirstName).toHaveValue(
      editUser.FirstName
    );
    await expect(recruitmentPage.inputMiddleName).toHaveValue(
      editUser.MiddleName
    );
    await expect(recruitmentPage.inputLastName).toHaveValue(editUser.LastName);
    await expect(recruitmentPage.dtJVacancy).toBeVisible();
    await expect(recruitmentPage.inputEmail).toHaveValue(editUser.Email);
    await expect(recruitmentPage.contactNumber).toHaveValue(
      editUser.ContactNumber
    );
    await expect(recruitmentPage.fileName).toHaveText("resume.pdf", {
      timeout: 10000,
    });
    await expect(recruitmentPage.keywords).toHaveValue(editUser.Keywords);
    await expect(recruitmentPage.dateOfApp).toHaveValue(editUser.DateOfApp);
    await expect(recruitmentPage.notes).toHaveValue(editUser.Notes);

    const fullName = fullNameCombiner(page, editUser);
    const firstName = editUser.FirstName;
    const candidateName = fullCandidateName(page, editUser);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Edit Candidate Profile success when empty all the field but edit Required field", async ({
    page,
  }) => {
    // const editUser = createValidUser();
    const ValidRequireUser = createRequiredValidUser();

    await recruitmentPage.deleteFile.click();
    await recruitmentPage.dtJVacancy.click();
    await recruitmentPage.emptyVacancy.click();
    await recruitmentPage.inputFirstName.clear();
    await recruitmentPage.inputMiddleName.clear();
    await recruitmentPage.inputLastName.clear();
    await recruitmentPage.inputEmail.clear();
    await recruitmentPage.contactNumber.clear();
    await recruitmentPage.keywords.clear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.notes.clear();

    const requiredFields: UserRequire = structuredClone(ValidRequireUser);

    await fillTheFields(requiredFields, page);

    await recruitmentPage.submitAdd.click();
    await recruitmentPage.confirmButton.click();

    await expect(recruitmentPage.successMessage).toBeVisible();
    await expect(recruitmentPage.inputFirstName).toHaveValue(
      ValidRequireUser.FirstName
    );
    await expect(recruitmentPage.inputLastName).toHaveValue(
      ValidRequireUser.LastName
    );
    await expect(recruitmentPage.inputEmail).toHaveValue(
      ValidRequireUser.Email
    );

    const halfName = halfNameCombiner(page, ValidRequireUser); //checked
    const firstName = ValidRequireUser.FirstName;
    const candidateName = halfCandidateName(page, ValidRequireUser);
    await deleteRecord(
      halfName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Required Error should be shown when empty required fields", async ({
    page,
  }) => {
    await recruitmentPage.deleteFile.click();
    await recruitmentPage.dtJVacancy.click();
    await recruitmentPage.emptyVacancy.click();
    await recruitmentPage.inputFirstName.clear();
    await recruitmentPage.inputMiddleName.clear();
    await recruitmentPage.inputLastName.clear();
    await recruitmentPage.inputEmail.clear();
    await recruitmentPage.contactNumber.clear();
    await recruitmentPage.keywords.clear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.notes.clear();

    await recruitmentPage.submitAdd.click();

    await expect(recruitmentPage.errorFirstName).toBeVisible();
    await expect(recruitmentPage.errorLastName).toBeVisible();
    await expect(recruitmentPage.errorEmail).toBeVisible();

    const fullName = fullNameCombiner(page, ValidUser);
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

  test("Validation alert should be show when input invalid email address", async ({
    page,
  }) => {
    await recruitmentPage.inputEmail.clear();

    const email = faker.random.word() + "@!@#$.com";
    await recruitmentPage.inputEmail.fill(email);
    await recruitmentPage.submitAdd.click();

    await expect(recruitmentPage.errorEmail).toBeVisible();

    const fullName = fullNameCombiner(page, ValidUser);
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

  test("User can upload resume if it not existed yet", async ({ page }) => {
    await recruitmentPage.deleteFile.click();
    await recruitmentPage.submitAdd.click();

    await recruitmentPage.switch.click();

    await recruitmentPage.browseFile.click();
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles("files/resume.pdf");
    await recruitmentPage.submitAdd.click();
    await expect(recruitmentPage.successMessage).toBeVisible();
    await expect(recruitmentPage.fileName).toHaveText("resume.pdf", {
      timeout: 10000,
    });

    const fullName = fullNameCombiner(page, ValidUser);
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

  test("User can download resume", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await recruitmentPage.download.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("correct.docx");

    const fullName = fullNameCombiner(page, ValidUser);
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

  test("User can replace resume", async ({ page }) => {
    await recruitmentPage.replaceFile.click();
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles("files/resume.pdf");
    await recruitmentPage.submitAdd.click();
    await expect(recruitmentPage.fileName).toHaveText("resume.pdf", {
      timeout: 10000,
    });
    const fullName = fullNameCombiner(page, ValidUser);
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

  test("File size validation alert should be shown when upload file with size larger than 1MB", async ({
    page,
  }) => {
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles("files/oversize.mp4");
    await expect(recruitmentPage.errorFile).toBeVisible();
    await expect(page.getByText("Attachment Size Exceeded")).toBeVisible(); // ko có gì khác nhau ở errorFile locator

    const fullName = fullNameCombiner(page, ValidUser);
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

  test("File type not allowed validation alert should be shown when uploading invalid file type", async ({
    page,
  }) => {
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles("files/invalidtype.jpg");
    await expect(recruitmentPage.errorFile).toBeVisible();
    await expect(page.getByText("File type not allowed")).toBeVisible(); // ko có gì khác nhau ở errorFile locator

    const fullName = fullNameCombiner(page, ValidUser);
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

  test("Date format validation message should be shown when input invalid date format", async ({
    page,
  }) => {
    const invalidDate = faker.animal.bear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.dateOfApp.fill(invalidDate);
    await recruitmentPage.submitAdd.click();
    await expect(recruitmentPage.errorDate).toBeVisible();

    const fullName = fullNameCombiner(page, ValidUser);
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
