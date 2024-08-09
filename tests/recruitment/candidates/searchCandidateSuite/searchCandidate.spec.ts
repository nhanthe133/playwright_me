import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../../../../pom/loginPage";
import { RecruitmentPage } from "../../../../pom/recruitmentPage";
import account from "../../../../data/account.json";
import ValidUser from "../../../../data/fakeData";
import { deleteRecord } from '../../../../utils/deleteRecord';
import { addRecord } from "../../../../utils/addRecord";
import { fullName } from "../../../../utils/fullName";
var loginPage: LoginPage;
var recruitmentPage: RecruitmentPage;


test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    recruitmentPage = new RecruitmentPage(page);
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
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
        await recruitmentPage.candidate.click();

        const firstName = ValidUser.firstName;
        const middleName = ValidUser.middleName ? `${ValidUser.middleName} ` : '';  
        const lastName = ValidUser.lastName;  
        const fullNamed = `${firstName} ${middleName}${lastName}`; 
        
        await recruitmentPage.candidate.click();
        await recruitmentPage.candidate.fill(firstName)//fill first name
        const candidateName = page.locator(`//div/child::span[text()='${fullNamed}']`);
        await candidateName.click();
        await recruitmentPage.submitButton.click();
        await page.waitForTimeout(5000);
        await recruitmentPage.recruitmentLink.click();
        const rowLocator = fullName(page, ValidUser);
        await expect(rowLocator).toBeVisible();
        await deleteRecord(rowLocator, page, recruitmentPage);
      }); 


  });