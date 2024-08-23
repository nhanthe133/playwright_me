import { test, expect} from "@playwright/test";
// import { format, formatDistance, formatRelative, subDays } from "date-fns";
import * as RecruitmentResource from "../../../../helpers/recruitmentResource";

let loginPage: RecruitmentResource.LoginPage;
let recruitmentPage: RecruitmentResource.RecruitmentPage;

test.beforeEach(async ({ page }) => {
  loginPage = new RecruitmentResource.LoginPage(page);
  recruitmentPage = new RecruitmentResource.RecruitmentPage(page);
  await page.goto("./auth/login");
  // login
  await loginPage.login(
    RecruitmentResource.account.adminAccount.username,
    RecruitmentResource.account.adminAccount.password
  );
  // vao recruitmentLink
  // lí do không để hàm tạo user trong đây dù nó lặp lại trong mỗi test vì nó trùng tên và gây ra vài side problem
});

test.describe("@SC Candidate Searching Suite", () => {
  test("Filter candidates by Job Title", async ({ page }) => {
    // const vacancy =
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();
    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.submitButton.click();
    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by Vacancy", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by Hiring Manager", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = recruitmentPage.getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by Status", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });
  test("Filter candidates by Candidate Name", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = recruitmentPage.fullCandidateName(ValidUser);
    await recruitmentPage.candidateField.click();
    await recruitmentPage.candidateField.fill(firstName); //fill first name
    await candidateName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by Keywords", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    await recruitmentPage.keywords.click();
    const keyWords = ValidUser.Keywords;
    await recruitmentPage.keywords.fill(keyWords);
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by From Date", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const from = RecruitmentResource.faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });

    const FromDate = RecruitmentResource.format(from, "yyyy-MM-dd");

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(FromDate);
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by To Date", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const to = RecruitmentResource.faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const ToDate = RecruitmentResource.format(to, "yyyy-MM-dd");

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    // const formattedTo = ValidUser.ToDate.split("T")[0];
    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(ToDate);
    await recruitmentPage.to.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by Method of Application", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();
    await RecruitmentResource.waitForElementVisible(fullName, 10000);
    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Filter candidates by fill all the fields", async ({ page }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    // const from = RecruitmentResource.faker.date.between({
    //   from: "2024-08-04T00:00:00.000Z",
    //   to: "2024-08-07T00:00:00.000Z",
    // });
    let now = RecruitmentResource.faker.date.recent();
    let from = RecruitmentResource.subtractDays(now, 5);
    // const to = RecruitmentResource.faker.date.between({
    //   from: "2024-08-08T00:00:00.000Z",
    //   to: "2024-08-10T00:00:00.000Z",
    // });
    let to = RecruitmentResource.addDays(now, 5);
    

    const FromDate = RecruitmentResource.format(from, "yyyy-MM-dd");
    const ToDate = RecruitmentResource.format(to, "yyyy-MM-dd");

    const fullName = recruitmentPage.fullNameCombiner(ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = recruitmentPage.fullCandidateName(ValidUser);
    // const formattedFrom = ValidUser.FromDate.split("T")[0];
    // const formattedTo = ValidUser.ToDate.split("T")[0];

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

    await RecruitmentResource.waitForElementVisible(fullName, 10000);

    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("Reset options to default when clicking reset button", async ({
    page,
  }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const from = RecruitmentResource.faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });
    const to = RecruitmentResource.faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const FromDate = RecruitmentResource.format(from, "yyyy-MM-dd");
    const ToDate = RecruitmentResource.format(to, "yyyy-MM-dd");

    const firstName = ValidUser.FirstName;
    const candidateName = recruitmentPage.fullCandidateName(ValidUser);
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

    await RecruitmentResource.elementShouldContainText(recruitmentPage.jobTitle, "-- Select --", 15000);
    await RecruitmentResource.elementShouldContainText(recruitmentPage.vacancy, "-- Select --", 15000);
    await RecruitmentResource.elementShouldContainText(recruitmentPage.status, "-- Select --", 15000);
    await RecruitmentResource.elementShouldContainText(recruitmentPage.method, "-- Select --", 15000);

    // await expect(recruitmentPage.candidateField).toBeEmpty();
    await RecruitmentResource.elementShouldEmpty(recruitmentPage.candidateField, 15000);
    // await expect(recruitmentPage.keywords).toBeEmpty();
    await RecruitmentResource.elementShouldEmpty(recruitmentPage.keywords, 15000);
    // await expect(recruitmentPage.from).toBeEmpty();
    await RecruitmentResource.elementShouldEmpty(recruitmentPage.from, 15000);
    // await expect(recruitmentPage.to).toBeEmpty();
    await RecruitmentResource.elementShouldEmpty(recruitmentPage.to, 15000);

    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("The Candidates form should be collapse when clicking the up caret button", async ({
    page,
  }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
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

    await recruitmentPage.deleteRecord(ValidUser);
  });

  test("The Candidates form should be shown when clicking the down caret button", async ({
    page,
  }) => {
    const ValidUser = RecruitmentResource.createValidUser();
    await recruitmentPage.addRecord(ValidUser);
    await recruitmentPage.recruitmentLink.click();

    await recruitmentPage.caretButton.click();
    await recruitmentPage.caretButton.click();
    await RecruitmentResource.waitForElementVisible(recruitmentPage.jobTitle, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.vacancy, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.status, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.method, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.candidateField, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.keywords, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.from, 10000);
    await RecruitmentResource.waitForElementVisible(recruitmentPage.to, 10000);

    await recruitmentPage.deleteRecord(ValidUser);

  });
});
