import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../../../../pom/loginPage";
import { RecruitmentPage } from "../../../../pom/recruitmentPage";
import account from "../../../../data/account.json";
import ValidUser from "../../../../data/fakeData";
import { deleteRecord } from '../../../../pom/recruitmentPom/deleteRecord';
import { addRecord } from "../../../../pom/recruitmentPom/addRecord";
import { fullName } from "../../../../pom/recruitmentPom/fullName";
import { fullCandidateName} from "../../../../pom/recruitmentPom/fullCandidateName"
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
    // vao recruitmentLink
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    
  });

  test.describe("Candidate Searching Suite", () => {
    test("Filter candidates by Job Title", async ({page}) => {
        await recruitmentPage.jobTitle.click();
        await recruitmentPage.jobTitleName.click();
        await recruitmentPage.submitButton.click();
        await page.waitForTimeout(5000);
        await recruitmentPage.recruitmentLink.click();
        const rowLocator = fullName(page, ValidUser);
        await expect(rowLocator).toBeVisible();
        await deleteRecord(rowLocator, page, recruitmentPage);
      });

      test("Filter candidates by Vacany", async ({page}) => {
        await recruitmentPage.vacancy.click();
        await recruitmentPage.vacancyName.click();
        await recruitmentPage.submitButton.click();
        await page.waitForTimeout(5000);
        await recruitmentPage.recruitmentLink.click();
        const rowLocator = fullName(page, ValidUser);
        await expect(rowLocator).toBeVisible();
        await deleteRecord(rowLocator, page, recruitmentPage);
      });

      test("Filter candidates by Status", async ({page}) => {
        await recruitmentPage.status.click();
        await recruitmentPage.statusName.click();
        await recruitmentPage.submitButton.click();
        await page.waitForTimeout(5000);
        await recruitmentPage.recruitmentLink.click();
        const rowLocator = fullName(page, ValidUser);
        await expect(rowLocator).toBeVisible();
        await deleteRecord(rowLocator, page, recruitmentPage);
      }); 

      test("Filter candidates by Candidate Name", async ({page}) => {
        await recruitmentPage.vipCandidate.click();
        const rowLocator = fullName(page, ValidUser);
        const firstName = ValidUser.firstName;
        const candidateName = fullCandidateName(page, ValidUser);
        await recruitmentPage.vipCandidate.fill(firstName)//fill first name
        await candidateName.click();
        await recruitmentPage.submitButton.click();
        await page.waitForTimeout(5000);
        await recruitmentPage.recruitmentLink.click();
        await expect(rowLocator).toBeVisible();
        await deleteRecord(rowLocator, page, recruitmentPage);
      }); 

      test("Filter candidates by Keywords", async ({page}) => {
        const rowLocator = fullName(page, ValidUser);
        await recruitmentPage.keywords.click();
        const keyWords = ValidUser.keywords;
        await recruitmentPage.keywords.fill(keyWords);
        await recruitmentPage.submitButton.click();
        await expect(rowLocator).toBeVisible();
      }); 

      test("Filter candidates by From field of Date of Application", async ({page}) => {
        await recruitmentPage.dateOfApp.click();
        await page.waitForTimeout(5000);
      }); 
  });