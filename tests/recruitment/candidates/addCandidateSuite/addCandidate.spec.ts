import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../../../../pom/loginPage";
import { RecruitmentPage } from "../../../../pom/recruitmentPage";
import account from "../../../../data/account.json";
import candidate from "../../../../data/candidate.json";
import { createValidUser } from "../../../../data/fakeData";

var loginPage: LoginPage;
var recruitmentPage: RecruitmentPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  recruitmentPage = new RecruitmentPage(page);
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await loginPage.login(
    account.adminAccount.username,
    account.adminAccount.password
  );
  await recruitmentPage.recruitmentLink.click();
});

// test('Showing Recruitment page when clicking on Recruitment button', async ({ page }) => {
//     await expect(recruitmentPage.recruitmentLink).toBeVisible();
//     await expect(page.url()).toBe(recruitmentPageLocator.recruitmentLink);
//     await expect(recruitmentPage.recruitmentHeader).toBeVisible();
//   })

test.describe("Add Candidate Suite", () => {
  test.beforeEach(async ({ page }) => {
    recruitmentPage = new RecruitmentPage(page);
    await recruitmentPage.addButton.click();
  });
  test("Add Candidate success when inputing all the field", async ({
    page,
  }) => {
    const user = createValidUser();
    const formattedDate = user.dateOfApp.toISOString().split("T")[0];
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    const [fileChooser] = await Promise.all([  
      page.waitForEvent('filechooser'), 
      recruitmentPage.browseFile.click()
    ]);  

    await fileChooser.setFiles('C:/Users/VanThe/Desktop/dummy folder/correct.docx');

    await recruitmentPage.input(
      user.firstName,
      user.lastName,
      user.email,
      user.middleName,
      user.contactNumber,
      user.keywords,
      formattedDate,
      user.notes
    );
    await expect(recruitmentPage.successMessage).toBeVisible();
    await expect(recruitmentPage.appStage).toBeVisible();
  });

  test('Add Candidate success when inputing required fields only', async ({ page }) => {
    const user = createValidUser();
    await recruitmentPage.input(user.firstName, user.lastName, user.email);
    await expect(recruitmentPage.successMessage).toBeVisible();
    await expect(recruitmentPage.appStage).toBeVisible();
  })

  test('Failed to add candidate when do not input required fields', async ({ page }) => {
    await recruitmentPage.submitAdd.click();
    await expect
  })
});
