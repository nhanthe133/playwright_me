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
  await recruitmentPage.addRecord(RecruitmentResource.ValidUser);
  await recruitmentPage.searchRecord(RecruitmentResource.ValidUser);
  const fullName = recruitmentPage.fullNameCombiner(RecruitmentResource.ValidUser);
  const rowName = fullName.locator(recruitmentPage.eye);
  await rowName.click();
  await recruitmentPage.switch.click();
});

test.describe("@EC Edit Candidate Suite", () => {
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

    await recruitmentPage.clearCandidateInfo();//clear mấy row có thể clear được

    const fully: RecruitmentResource.User = structuredClone(editUser);

    await recruitmentPage.fillTheFields(fully);
    await recruitmentPage.submitAdd.click();
    await recruitmentPage.confirmButton.click();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);

    //expect hell:
    await RecruitmentResource.elementShouldContainText(recruitmentPage.dtJVacancy, "Senior QA Lead", 15000);
    expect(RecruitmentResource.waitForElementVisible(recruitmentPage.dtJVacancy, 5000));
    await RecruitmentResource.elementShouldContainText(recruitmentPage.fileName, "resume.pdf", 20000);
    const fields = [
      { element: recruitmentPage.inputFirstName, value: editUser.FirstName },
      { element: recruitmentPage.inputMiddleName, value: editUser.MiddleName },
      { element: recruitmentPage.inputLastName, value: editUser.LastName },
      { element: recruitmentPage.inputEmail, value: editUser.Email },
      { element: recruitmentPage.contactNumber, value: editUser.ContactNumber },
      { element: recruitmentPage.keywords, value: editUser.Keywords },
      { element: recruitmentPage.dateOfApp, value: editUser.DateOfApp },
      { element: recruitmentPage.notes, value: editUser.Notes }
  ];
  
  for (const field of fields) {
      await RecruitmentResource.elementValueShouldContain(field.element, field.value, 15000);
  }

    await recruitmentPage.deleteRecord(editUser);
  });

  test("Edit Candidate Profile success when empty all the field but edit Required field", async ({
    page,
  }) => {
    const ValidRequireUser = RecruitmentResource.createRequiredValidUser();

    await recruitmentPage.deleteFile.click();
    await recruitmentPage.dtJVacancy.click();
    await recruitmentPage.emptyVacancy.click();

    await recruitmentPage.clearCandidateInfo();

    const requiredFields: RecruitmentResource.UserRequire = structuredClone(ValidRequireUser);

    await recruitmentPage.fillTheFields(requiredFields);

    await recruitmentPage.submitAdd.click();
    await recruitmentPage.confirmButton.click();

    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);

    const fields = [
      { element: recruitmentPage.inputFirstName, value: ValidRequireUser.FirstName },
      { element: recruitmentPage.inputLastName, value: ValidRequireUser.LastName },
      { element: recruitmentPage.inputEmail, value: ValidRequireUser.Email }
  ];
  
  for (const field of fields) {
      await RecruitmentResource.elementValueShouldContain(field.element, field.value, 15000);
  }
    await recruitmentPage.deleteRecord(ValidRequireUser);
  });

  test("Required Error should be shown when empty required fields", async ({
    page,
  }) => {
    await recruitmentPage.deleteFile.click();
    await recruitmentPage.dtJVacancy.click();
    await recruitmentPage.emptyVacancy.click();

    await recruitmentPage.clearCandidateInfo();

    await recruitmentPage.submitAdd.click();

    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorFirstName, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorLastName, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorEmail, 10000);


    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
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

    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
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
    await RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000);
    await RecruitmentResource.elementShouldContainText(recruitmentPage.fileName, "resume.pdf");
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("User can download resume", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    await recruitmentPage.download.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("correct.docx");
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
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
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
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
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
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
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("Date format validation message should be shown when input invalid date format", async ({
    page,
  }) => {
    const invalidDate = RecruitmentResource.faker.animal.bear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.dateOfApp.fill(invalidDate);
    await recruitmentPage.submitAdd.click();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorDate, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
});
