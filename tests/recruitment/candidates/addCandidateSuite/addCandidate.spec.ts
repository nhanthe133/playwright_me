import { test, expect, type Page } from "@playwright/test";
import {
  LoginPage,
  RecruitmentPage,
  deleteRecord,
  fullNameCombiner,
  halfNameCombiner,
  fullCandidateName,
  account,
  ValidUser,
  halfCandidateName,
  faker,
  createRequiredValidUser,
} from "../../../../helpers/importRecruitment";
import {
  fillTheFields,
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
  await recruitmentPage.recruitmentLink.click();
});

test("Showing Recruitment page when clicking on Recruitment button", async ({
  page,
}) => {
  await expect(recruitmentPage.recruitmentLink).toBeVisible();
  await expect(page).toHaveURL("/web/recruitment/viewCandidates");
  await expect(recruitmentPage.recruitmentHeader).toBeVisible();
});

test.describe("Add Candidate Suite", () => {
  test.beforeEach(async ({ page }) => {
    recruitmentPage = new RecruitmentPage(page);
    await recruitmentPage.addButton.click();
  });

  // test("Add Candidate success when inputing all the field", async ({
  //   page,
  // }) => {
  //   await recruitmentPage.dateOfApp.clear();
  //   await recruitmentPage.vacancy.click();
  //   await recruitmentPage.vacancyName.click();

  //   const [fileChooser] = await Promise.all([
  //     page.waitForEvent("filechooser"),
  //     recruitmentPage.browseFile.click(),
  //   ]);

  //   await fileChooser.setFiles("files/correct.docx");

  //   const fully: User = {
  //     FirstName: ValidUser.firstName,
  //     LastName: ValidUser.lastName,
  //     Email: ValidUser.email,
  //     MiddleName: ValidUser.middleName,
  //     ContactNumber: ValidUser.contactNumber,
  //     Keywords: ValidUser.keywords,
  //     DateOfApp: ValidUser.dateOfApp,
  //     Notes: ValidUser.notes,
  //   };
  //   // const fully = JSON.parse(JSON.stringify(ValidUser));
  //   // const fully: User = structuredClone(ValidUser);

  //   await fillTheFields(fully, page);
  //   await recruitmentPage.submitAdd.click();

  //   await expect(recruitmentPage.successMessage).toBeVisible();
  //   await expect(recruitmentPage.appStage).toBeVisible({ timeout: 10000 });
  //   const fullName = fullNameCombiner(page, ValidUser);
  //   const firstName = ValidUser.firstName;
  //   const candidateName = fullCandidateName(page, ValidUser);
  //   await deleteRecord(
  //     fullName,
  //     firstName,
  //     candidateName,
  //     page,
  //     recruitmentPage
  //   );
  // });

  test("Add Candidate success when inputing all the field", async ({
    page,
  }) => {
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();

    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);

    await fileChooser.setFiles("files/correct.docx");

    // const fully: User = {
    //   FirstName: ValidUser.firstName,
    //   LastName: ValidUser.lastName,
    //   Email: ValidUser.email,
    //   MiddleName: ValidUser.middleName,
    //   ContactNumber: ValidUser.contactNumber,
    //   Keywords: ValidUser.keywords,
    //   DateOfApp: ValidUser.dateOfApp,
    //   Notes: ValidUser.notes,
    // };
    // const fully = JSON.parse(JSON.stringify(ValidUser));
    const fully: User = structuredClone(ValidUser);

    await fillTheFields(fully, page);
    await recruitmentPage.submitAdd.click();

    await expect(recruitmentPage.successMessage).toBeVisible();
    await expect(recruitmentPage.appStage).toBeVisible({ timeout: 10000 });
    const fullName = fullNameCombiner(page, ValidUser);
    // const firstName = ValidUser.firstName;
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

  test("Add Candidate success when inputing required fields only", async ({
    page,
  }) => {
    // const required: User = {
    //   FirstName: ValidUser.FirstName,
    //   LastName: ValidUser.LastName,
    //   Email: ValidUser.Email
    // };
    const ValidRequireUser = createRequiredValidUser();

    const requiredFields: UserRequire = structuredClone(ValidRequireUser);

    await fillTheFields(requiredFields, page);

    await recruitmentPage.submitAdd.click();
    await expect(recruitmentPage.successMessage).toBeVisible();
    await expect(recruitmentPage.appStage).toBeVisible({ timeout: 10000 });
    const fullName = halfNameCombiner(page, ValidRequireUser);
    // const firstName = ValidRequireUser.firstName;
    const firstName = ValidRequireUser.FirstName;

    const candidateName = halfCandidateName(page, ValidRequireUser);

    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Failed to add candidate when do not input required fields", async ({
    page,
  }) => {
    await recruitmentPage.submitAdd.click();
    await expect(recruitmentPage.errorFirstName).toBeVisible();
    await expect(recruitmentPage.errorLastName).toBeVisible();
    await expect(recruitmentPage.errorEmail).toBeVisible();
  });

  test("Validation alert should be show when input invalid email address", async ({
    page,
  }) => {
    // const email = createInvalidEMail();

    const email = faker.random.word() + "@!@#$.com";
    await recruitmentPage.inputEmail.fill(email);
    await recruitmentPage.submitAdd.click();

    await expect(recruitmentPage.errorEmail).toBeVisible();
    await expect(page.getByText("admin@example.com")).toBeVisible();
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
  });

  test("Date format validation message should be shown when input invalid date format", async ({
    page,
  }) => {
    const invalidDate = faker.animal.bear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.dateOfApp.fill(invalidDate);
    await recruitmentPage.submitAdd.click();
    await expect(recruitmentPage.errorDate).toBeVisible();
  });

  test("Navigation to Recruitment page when clicking the cancel button", async ({
    page,
  }) => {
    await recruitmentPage.cancelButton.click();
    await expect(page).toHaveURL("/web/recruitment/viewCandidates");
    await expect(recruitmentPage.recruitmentHeader).toBeVisible();
  });
});
