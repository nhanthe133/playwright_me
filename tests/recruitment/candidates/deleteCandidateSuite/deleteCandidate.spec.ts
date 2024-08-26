import { test } from "@playwright/test";
import * as RecruitmentResource from "../../../../helpers/recruitmentResource";
let recruitmentPage: RecruitmentResource.RecruitmentPage;
import { LoginPage } from "../../../../pom/loginPage";
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  recruitmentPage = new RecruitmentResource.RecruitmentPage(page);
  await page.goto("./auth/login");

  await loginPage.login(
    RecruitmentResource.account.adminAccount.username,
    RecruitmentResource.account.adminAccount.password
  );


  await recruitmentPage.addRecord(RecruitmentResource.ValidUser);
  await recruitmentPage.recruitmentLink.click();
  await recruitmentPage.searchRecord(RecruitmentResource.ValidUser);
});

test.describe("@XC Delete Candidate Suite", () => {
  test("@XC01 User can cancel delete record", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click();
    await recruitmentPage.cancelDelete.click();
    await loginPage.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@XC02 User can cancel delete multiple records", async ({ page }) => {
    const editUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(editUser);
    await recruitmentPage.recruitmentLink.click();
    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = recruitmentPage.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();
    await recruitmentPage.submitButton.click();
    const users = [RecruitmentResource.ValidUser, editUser];
    await recruitmentPage.clickCheckboxes(users);
    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.cancelDelete.click();
    for (const user of users) {
      const fullName = recruitmentPage.fullNameCombiner(user);
      await loginPage.waitForElementVisible(fullName, 10000);
    }
    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    await loginPage.waitForElementVisible(
      recruitmentPage.successMessage,
      10000
    );
  });
  test("@XC03 User can delete multiple records", async ({ page }) => {
    const editUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(editUser);
    await recruitmentPage.recruitmentLink.click();
    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = recruitmentPage.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();
    await recruitmentPage.submitButton.click();
    const users = [RecruitmentResource.ValidUser, editUser];
    await recruitmentPage.clickCheckboxes(users);
    await page.waitForTimeout(5000);
    await recruitmentPage.deleteSelected.click();
    await recruitmentPage.ultimateDelete.click();
    await loginPage.waitForElementVisible(
      recruitmentPage.successMessage,
      10000
    );
  });

  test("@XC04 User can delete one record", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const rowName = fullName.locator(recruitmentPage.trashButton);
    await rowName.click(); // nhấp vào thùng rác
    await recruitmentPage.ultimateDelete.click();
    await loginPage.waitForElementVisible(
      recruitmentPage.successMessage,
      10000
    );
  });
});
