import { test, expect } from "@playwright/test";

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
  await RecruitmentResource.searchRecord(RecruitmentResource.ValidUser, page, recruitmentPage);
  const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
  const rowName = fullName.locator(recruitmentPage.eye);
  await rowName.click();
  await recruitmentPage.switch.click();
});


test.describe("Edit Candidate Suite", () => {
  test("Edit Candidate Profile success when editing all the field", async ({
    page,
  }) => {
    const editUser = RecruitmentResource.createValidUser();
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

    const fully: RecruitmentResource.User = structuredClone(editUser);

    await RecruitmentResource.fillTheFields(fully, page);
    await recruitmentPage.submitAdd.click();
    await recruitmentPage.confirmButton.click();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);

    //expect hell:
    await RecruitmentResource.elementShouldContainText(recruitmentPage.dtJVacancy, "Senior QA Lead", 15000);
  
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputFirstName, editUser.FirstName, 15000);
   
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputMiddleName, editUser.MiddleName, 15000);

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputLastName, editUser.LastName, 15000);

    expect(RecruitmentResource.waitForElementVisible(recruitmentPage.dtJVacancy, 5000));

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputEmail, editUser.Email, 15000);

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.contactNumber, editUser.ContactNumber, 15000);

    await RecruitmentResource.elementShouldContainText(recruitmentPage.fileName, "resume.pdf", 15000);

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.keywords, editUser.Keywords, 15000);

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.dateOfApp, editUser.DateOfApp, 15000);

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.notes, editUser.Notes, 15000);

    const fullName = RecruitmentResource.fullNameCombiner(page, editUser);
    const firstName = editUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, editUser);
    await RecruitmentResource.deleteRecord(
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
    const ValidRequireUser = RecruitmentResource.createRequiredValidUser();

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

    const requiredFields: RecruitmentResource.UserRequire = structuredClone(ValidRequireUser);

    await RecruitmentResource.fillTheFields(requiredFields, page);

    await recruitmentPage.submitAdd.click();
    await recruitmentPage.confirmButton.click();

    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputFirstName, ValidRequireUser.FirstName, 15000);
    
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputLastName, ValidRequireUser.LastName, 15000);

    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputEmail, ValidRequireUser.Email, 15000);


    const halfName = RecruitmentResource.halfNameCombiner(page, ValidRequireUser); //checked
    const firstName = ValidRequireUser.FirstName;
    const candidateName = RecruitmentResource.halfCandidateName(page, ValidRequireUser);
    await RecruitmentResource.deleteRecord(
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

    // await expect(recruitmentPage.errorFirstName).toBeVisible();
    // await expect(recruitmentPage.errorLastName).toBeVisible();
    // await expect(recruitmentPage.errorEmail).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorFirstName, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorLastName, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorEmail, 10000);


    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
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

    const email = RecruitmentResource.faker.random.word() + "@!@#$.com";
    await recruitmentPage.inputEmail.fill(email);
    await recruitmentPage.submitAdd.click();

    // await expect(recruitmentPage.errorEmail).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorEmail, 10000);

    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
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
    // await expect(recruitmentPage.successMessage).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);

    await RecruitmentResource.elementShouldContainText(recruitmentPage.fileName, "resume.pdf");


    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
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

    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
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
    await RecruitmentResource.elementShouldContainText(recruitmentPage.fileName, "resume.pdf", 15000);
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
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
    // await expect(recruitmentPage.errorFile).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorFile, 10000);
    await expect(page.getByText("Attachment Size Exceeded")).toBeVisible(); // ko có gì khác nhau ở errorFile locator

    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
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
    // await expect(recruitmentPage.errorFile).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorFile, 10000);
    await expect(page.getByText("File type not allowed")).toBeVisible(); // ko có gì khác nhau ở errorFile locator

    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
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
    const invalidDate = RecruitmentResource.faker.animal.bear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.dateOfApp.fill(invalidDate);
    await recruitmentPage.submitAdd.click();
    // await expect(recruitmentPage.errorDate).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorDate, 10000);


    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });
});
