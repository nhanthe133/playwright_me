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
  await recruitmentPage.recruitmentLink.click();
});

test.describe("@SC Candidate Searching Suite", () => {
  test("@SC1 Filter candidates by Job Title", async () => {
    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.submitButton.click();
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
  test("@SC2 Filter candidates by Vacancy", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC3 Filter candidates by Hiring Manager", async ({ page }) => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = recruitmentPage.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC4 Filter candidates by Status", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
  test("@SC5 Filter candidates by Candidate Name", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = recruitmentPage.fullCandidateName(
      RecruitmentResource.ValidUser
    );
    await recruitmentPage.candidateField.click();
    await recruitmentPage.candidateField.fill(firstName); //fill first name
    await candidateName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC6 Filter candidates by Keywords", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    await recruitmentPage.keywords.click();
    const keyWords = RecruitmentResource.ValidUser.Keywords;
    await recruitmentPage.keywords.fill(keyWords);
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC7 Filter candidates by From Date", async () => {
    const now = RecruitmentResource.faker.date.recent();
    const from = RecruitmentResource.subtractDays(now, 5);
    const FromDate = RecruitmentResource.format(from, "yyyy-MM-dd");
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(FromDate);
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC8 Filter candidates by To Date", async () => {
    const now = RecruitmentResource.faker.date.recent();
    const to = RecruitmentResource.addDays(now, 5);
    const ToDate = RecruitmentResource.format(to, "yyyy-MM-dd");
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(ToDate);
    await recruitmentPage.to.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC9 Filter candidates by Method of Application", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC10 Filter candidates by fill all the fields", async ({ page }) => {
    const now = RecruitmentResource.faker.date.recent();
    const from = RecruitmentResource.subtractDays(now, 5);
    const to = RecruitmentResource.addDays(now, 5);
    const FromDate = RecruitmentResource.format(from, "yyyy-MM-dd");
    const ToDate = RecruitmentResource.format(to, "yyyy-MM-dd");
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = recruitmentPage.fullCandidateName(
      RecruitmentResource.ValidUser
    );
    const keyWords = RecruitmentResource.ValidUser.Keywords;
    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = recruitmentPage.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.clickNFill(recruitmentPage.candidateField, firstName);
    await candidateName.click();
    await recruitmentPage.clickNFill(recruitmentPage.keywords, keyWords);
    await recruitmentPage.clickNFill(recruitmentPage.from, FromDate);
    await recruitmentPage.clickNFill(recruitmentPage.to, ToDate);
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC11 Reset options to default when clicking reset button", async () => {
    const now = RecruitmentResource.faker.date.recent();
    const from = RecruitmentResource.subtractDays(now, 5);
    const to = RecruitmentResource.addDays(now, 5);
    const FromDate = RecruitmentResource.format(from, "yyyy-MM-dd");
    const ToDate = RecruitmentResource.format(to, "yyyy-MM-dd");
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = recruitmentPage.fullCandidateName(
      RecruitmentResource.ValidUser
    );
    const keyWords = RecruitmentResource.ValidUser.Keywords;
    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.clickNFill(recruitmentPage.candidateField, firstName); //fill first name
    await candidateName.click();
    await recruitmentPage.clickNFill(recruitmentPage.keywords, keyWords);
    await recruitmentPage.clickNFill(recruitmentPage.from, FromDate);
    await recruitmentPage.clickNFill(recruitmentPage.to, ToDate);
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.resetButton.click();
    await RecruitmentResource.elementShouldContainText(
      recruitmentPage.jobTitle,
      "-- Select --",
      15000
    );
    await RecruitmentResource.elementShouldContainText(
      recruitmentPage.vacancy,
      "-- Select --",
      15000
    );
    await RecruitmentResource.elementShouldContainText(
      recruitmentPage.status,
      "-- Select --",
      15000
    );
    await RecruitmentResource.elementShouldContainText(
      recruitmentPage.method,
      "-- Select --",
      15000
    );
    await RecruitmentResource.elementShouldEmpty(
      recruitmentPage.candidateField,
      15000
    );
    await RecruitmentResource.elementShouldEmpty(
      recruitmentPage.keywords,
      15000
    );
    await RecruitmentResource.elementShouldEmpty(recruitmentPage.from, 15000);
    await RecruitmentResource.elementShouldEmpty(recruitmentPage.to, 15000);
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@SC12 The Candidates form should be collapse when clicking the up caret button", async () => {
    await recruitmentPage.caretButton.click();
    const elementsToCheck = [
      recruitmentPage.jobTitle,
      recruitmentPage.vacancy,
      recruitmentPage.status,
      recruitmentPage.method,
      recruitmentPage.candidateField,
      recruitmentPage.keywords,
      recruitmentPage.from,
      recruitmentPage.to,
    ];
    for (const element of elementsToCheck) {
      await expect(element).toBeHidden();
    }
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
  test("@SC13 The Candidates form should be shown when clicking the down caret button", async () => {
    await recruitmentPage.caretButton.click();
    await recruitmentPage.caretButton.click();
    const elements = [
      recruitmentPage.jobTitle,
      recruitmentPage.vacancy,
      recruitmentPage.status,
      recruitmentPage.method,
      recruitmentPage.candidateField,
      recruitmentPage.keywords,
      recruitmentPage.from,
      recruitmentPage.to,
    ];
    for (const element of elements) {
      await RecruitmentResource.waitForElementVisible(element, 10000);
    }
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
});
