import { test, expect } from "@playwright/test";
import * as RecruitmentResource from "../../../../helpers/recruitmentResource";
import {
  fillTheFields,
  User,
  UserRequire,
} from "../../../../pom/recruitmentPage";

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
  await recruitmentPage.recruitmentLink.click();
});

test("Showing Recruitment page when clicking on Recruitment button", async ({
  page,
}) => {
  // await expect(recruitmentPage.recruitmentLink).toBeVisible();
  expect(RecruitmentResource.waitForElementVisible(recruitmentPage.recruitmentLink, 10000));
  await expect(page).toHaveURL("/web/recruitment/viewCandidates");
  // await expect(recruitmentPage.recruitmentHeader).toBeVisible();
  expect(RecruitmentResource.waitForElementVisible(recruitmentPage.recruitmentHeader, 10000));
  
});

test.describe("Add Candidate Suite", () => {
  test.beforeEach(async ({ page }) => {
    recruitmentPage = new RecruitmentResource.RecruitmentPage(page);
    await recruitmentPage.addButton.click();
  });

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

    const fully: User = structuredClone(RecruitmentResource.ValidUser);

    await fillTheFields(fully, page);
    await recruitmentPage.submitAdd.click();

    // await expect(recruitmentPage.successMessage).toBeVisible();
  expect(RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000));


    await RecruitmentResource.waitForElementVisible(recruitmentPage.appStage, 10000);

    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    // const firstName = ValidUser.firstName;
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

  test("Add Candidate success when inputing required fields only", async ({
    page,
  }) => {
 
    const ValidRequireUser = RecruitmentResource.createRequiredValidUser();

    const requiredFields: UserRequire = structuredClone(ValidRequireUser);

    await fillTheFields(requiredFields, page);

    await recruitmentPage.submitAdd.click();
    // await expect(recruitmentPage.successMessage).toBeVisible();
  expect(RecruitmentResource.waitForElementVisible(recruitmentPage.successMessage, 10000));

    await RecruitmentResource.waitForElementVisible(recruitmentPage.appStage, 10000);
    const fullName = RecruitmentResource.halfNameCombiner(page, ValidRequireUser);
    // const firstName = ValidRequireUser.firstName;
    const firstName = ValidRequireUser.FirstName;

    const candidateName = RecruitmentResource.halfCandidateName(page, ValidRequireUser);

    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Failed to add candidate when do not input required fields", async () => {
    await recruitmentPage.submitAdd.click();
    // await expect(recruitmentPage.errorFirstName).toBeVisible();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorFirstName, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorLastName, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.errorEmail, 10000);


  });

  test("Validation alert should be show when input invalid email address", async ({
    page,
  }) => {

    const email = RecruitmentResource.faker.random.word() + "@!@#$.com";
    await recruitmentPage.inputEmail.fill(email);
    await recruitmentPage.submitAdd.click();

    // await expect(recruitmentPage.errorEmail).toBeVisible();
  await RecruitmentResource.waitForElementVisible(recruitmentPage.errorEmail, 10000);

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
    // await expect(recruitmentPage.errorFile).toBeVisible();
  expect(RecruitmentResource.waitForElementVisible(recruitmentPage.errorFile, 10000));
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
    // await expect(recruitmentPage.errorFile).toBeVisible();
  expect(RecruitmentResource.waitForElementVisible(recruitmentPage.errorFile, 10000));
    await expect(page.getByText("File type not allowed")).toBeVisible(); // ko có gì khác nhau ở errorFile locator
  });

  test("Date format validation message should be shown when input invalid date format", async () => {
    const invalidDate = RecruitmentResource.faker.animal.bear();
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.dateOfApp.fill(invalidDate);
    await recruitmentPage.submitAdd.click();
    // await expect(recruitmentPage.errorDate).toBeVisible();
  await RecruitmentResource.waitForElementVisible(recruitmentPage.errorDate, 10000);


  });

  test("Navigation to Recruitment page when clicking the cancel button", async ({
    page,
  }) => {
    await recruitmentPage.cancelButton.click();
    await expect(page).toHaveURL("/web/recruitment/viewCandidates");
    // await expect(recruitmentPage.recruitmentHeader).toBeVisible();
  await RecruitmentResource.waitForElementVisible(recruitmentPage.recruitmentHeader, 10000);


  });
});
