import { test, expect} from "@playwright/test";
// import { format, formatDistance, formatRelative, subDays } from "date-fns";
import * as RecruitementResource from "../../../../helpers/recruitmentResource";

let loginPage: RecruitementResource.LoginPage;
let recruitmentPage: RecruitementResource.RecruitmentPage;

test.beforeEach(async ({ page }) => {
  loginPage = new RecruitementResource.LoginPage(page);
  recruitmentPage = new RecruitementResource.RecruitmentPage(page);
  await page.goto("./auth/login");
  // login
  await loginPage.login(
    RecruitementResource.account.adminAccount.username,
    RecruitementResource.account.adminAccount.password
  );
  // vao recruitmentLink
  // lí do không để hàm tạo user trong đây dù nó lặp lại trong mỗi test vì nó trùng tên và gây ra vài side problem
});

test.describe("Candidate Searching Suite", () => {
  test("Filter candidates by Job Title", async ({ page }) => {
    // const vacancy =
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.submitButton.click();
    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by Vacancy", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by Hiring Manager", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = RecruitementResource.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by Status", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });
  test("Filter candidates by Candidate Name", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await recruitmentPage.candidateField.click();
    await recruitmentPage.candidateField.fill(firstName); //fill first name
    await candidateName.click();
    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by Keywords", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    await recruitmentPage.keywords.click();
    const keyWords = ValidUser.Keywords;
    await recruitmentPage.keywords.fill(keyWords);
    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by From Date", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const from = RecruitementResource.faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });

    const FromDate = RecruitementResource.format(from, "yyyy-MM-dd");

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    // const formattedFrom = ValidUser.FromDate.split("T")[0];
    // const formattedDate = ValidUser.DateOfApp.split("T")[0];
    // const formattedTo = ValidUser.ToDate.split("T")[0];
    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(FromDate);
    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by To Date", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const to = RecruitementResource.faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const ToDate = RecruitementResource.format(to, "yyyy-MM-dd");

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    // const formattedTo = ValidUser.ToDate.split("T")[0];
    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(ToDate);
    await recruitmentPage.to.click();
    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by Method of Application", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();
    await RecruitementResource.waitForElementVisible(fullName, 10000);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by fill all the fields", async ({ page }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const from = RecruitementResource.faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });
    const to = RecruitementResource.faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const FromDate = RecruitementResource.format(from, "yyyy-MM-dd");
    const ToDate = RecruitementResource.format(to, "yyyy-MM-dd");

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    // const formattedFrom = ValidUser.FromDate.split("T")[0];
    // const formattedTo = ValidUser.ToDate.split("T")[0];

    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();

    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = RecruitementResource.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();

    await recruitmentPage.candidateField.click();
    await recruitmentPage.candidateField.fill(firstName); //fill first name
    await candidateName.click();

    await recruitmentPage.keywords.click();
    const keyWords = ValidUser.Keywords;
    await recruitmentPage.keywords.fill(keyWords);

    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(FromDate);

    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(ToDate);

    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();

    await RecruitementResource.waitForElementVisible(fullName, 10000);

    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Reset options to default when clicking reset button", async ({
    page,
  }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const from = RecruitementResource.faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });
    const to = RecruitementResource.faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const FromDate = RecruitementResource.format(from, "yyyy-MM-dd");
    const ToDate = RecruitementResource.format(to, "yyyy-MM-dd");

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    // const formattedFrom = FromDate.split("T")[0];
    // const formattedTo = ToDate.split("T")[0];
    const keyWords = ValidUser.Keywords;

    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.candidateField.click();
    await recruitmentPage.candidateField.fill(firstName); //fill first name
    await candidateName.click();
    await recruitmentPage.keywords.click();
    await recruitmentPage.keywords.fill(keyWords);
    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(FromDate);
    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(ToDate);
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.resetButton.click();

    await RecruitementResource.elementShouldContainText(recruitmentPage.jobTitle, "-- Select --", 15000);
    await RecruitementResource.elementShouldContainText(recruitmentPage.vacancy, "-- Select --", 15000);
    await RecruitementResource.elementShouldContainText(recruitmentPage.status, "-- Select --", 15000);
    await RecruitementResource.elementShouldContainText(recruitmentPage.method, "-- Select --", 15000);

    // await expect(recruitmentPage.candidateField).toBeEmpty();
    await RecruitementResource.elementShouldEmpty(recruitmentPage.candidateField, 15000);
    // await expect(recruitmentPage.keywords).toBeEmpty();
    await RecruitementResource.elementShouldEmpty(recruitmentPage.keywords, 15000);
    // await expect(recruitmentPage.from).toBeEmpty();
    await RecruitementResource.elementShouldEmpty(recruitmentPage.from, 15000);
    // await expect(recruitmentPage.to).toBeEmpty();
    await RecruitementResource.elementShouldEmpty(recruitmentPage.to, 15000);

    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("The Candidates form should be collapse when clicking the up caret button", async ({
    page,
  }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    await recruitmentPage.caretButton.click();

    await expect(recruitmentPage.jobTitle).toBeHidden();
    await expect(recruitmentPage.vacancy).toBeHidden();
    await expect(recruitmentPage.status).toBeHidden();
    await expect(recruitmentPage.method).toBeHidden();
    await expect(recruitmentPage.candidateField).toBeHidden();
    await expect(recruitmentPage.keywords).toBeHidden();
    await expect(recruitmentPage.from).toBeHidden();
    await expect(recruitmentPage.to).toBeHidden();

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("The Candidates form should be shown when clicking the down caret button", async ({
    page,
  }) => {
    const ValidUser = RecruitementResource.createValidUser();
    await RecruitementResource.addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    await recruitmentPage.caretButton.click();
    await recruitmentPage.caretButton.click();
    await RecruitementResource.waitForElementVisible(recruitmentPage.jobTitle, 10000);
    await RecruitementResource.waitForElementVisible(recruitmentPage.vacancy, 10000);
    await RecruitementResource.waitForElementVisible(recruitmentPage.status, 10000);
    await RecruitementResource.waitForElementVisible(recruitmentPage.method, 10000);
    await RecruitementResource.waitForElementVisible(recruitmentPage.candidateField, 10000);
    await RecruitementResource.waitForElementVisible(recruitmentPage.keywords, 10000);
    await RecruitementResource.waitForElementVisible(recruitmentPage.from, 10000);
    await RecruitementResource.waitForElementVisible(recruitmentPage.to, 10000);

    

    const fullName = RecruitementResource.fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = RecruitementResource.fullCandidateName(page, ValidUser);
    await RecruitementResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });
});
