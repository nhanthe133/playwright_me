import { test, expect, type Page } from "@playwright/test";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import {
  LoginPage,
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  fullCandidateName,
  getHiringName,
  account,
  createValidUser,
  faker,
} from "../../../../helpers/importRecruitment";

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
  // lí do không để hàm tạo user trong đây dù nó lặp lại trong mỗi test vì nó trùng tên và gây ra vài side problem
});

test.describe("Candidate Searching Suite", () => {
  test("Filter candidates by Job Title", async ({ page }) => {
    // const vacancy =
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.submitButton.click();
    const fullName = fullNameCombiner(page, ValidUser);
    await expect(fullName).toBeVisible(); // lý do chỉ check fullname vì nó Unique
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

  test("Filter candidates by Vacancy", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
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

  test("Filter candidates by Hiring Manager", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = fullNameCombiner(page, ValidUser);

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = getHiringName(hireName);
    await recruitmentPage.hiring.click();
    await page.locator(hiringName).click();

    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
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

  test("Filter candidates by Status", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
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
  test("Filter candidates by Candidate Name", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await recruitmentPage.candidateField.click();
    await recruitmentPage.candidateField.fill(firstName); //fill first name
    await candidateName.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by Keywords", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.keywords.click();
    const keyWords = ValidUser.Keywords;
    await recruitmentPage.keywords.fill(keyWords);
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
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

  test("Filter candidates by From Date", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const from = faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });

    const FromDate = format(from, "yyyy-MM-dd");

    const fullName = fullNameCombiner(page, ValidUser);
    // const formattedFrom = ValidUser.FromDate.split("T")[0];
    // const formattedDate = ValidUser.DateOfApp.split("T")[0];
    // const formattedTo = ValidUser.ToDate.split("T")[0];
    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(FromDate);
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
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

  test("Filter candidates by To Date", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const to = faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const ToDate = format(to, "yyyy-MM-dd");

    const fullName = fullNameCombiner(page, ValidUser);
    // const formattedTo = ValidUser.ToDate.split("T")[0];
    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(ToDate);
    await recruitmentPage.to.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
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

  test("Filter candidates by Method of Application", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filter candidates by fill all the fields", async ({ page }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    const from = faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });
    const to = faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const FromDate = format(from, "yyyy-MM-dd");
    const ToDate = format(to, "yyyy-MM-dd");

    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
    // const formattedFrom = ValidUser.FromDate.split("T")[0];
    // const formattedTo = ValidUser.ToDate.split("T")[0];

    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();

    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();

    const hireName = await recruitmentPage.hireName.textContent();
    const hiringName = getHiringName(hireName);
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

    await expect(fullName).toBeVisible();
    await deleteRecord(
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
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();
    const from = faker.date.between({
      from: "2024-08-04T00:00:00.000Z",
      to: "2024-08-07T00:00:00.000Z",
    });
    const to = faker.date.between({
      from: "2024-08-08T00:00:00.000Z",
      to: "2024-08-10T00:00:00.000Z",
    });

    const FromDate = format(from, "yyyy-MM-dd");
    const ToDate = format(to, "yyyy-MM-dd");

    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.FirstName;
    const candidateName = fullCandidateName(page, ValidUser);
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

    await expect(recruitmentPage.jobTitle).toHaveText("-- Select --");
    await expect(recruitmentPage.vacancy).toHaveText("-- Select --");
    await expect(recruitmentPage.status).toHaveText("-- Select --");
    await expect(recruitmentPage.method).toHaveText("-- Select --");
    await expect(recruitmentPage.candidateField).toBeEmpty();
    await expect(recruitmentPage.keywords).toBeEmpty();
    await expect(recruitmentPage.from).toBeEmpty();
    await expect(recruitmentPage.to).toBeEmpty();

    await deleteRecord(
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
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
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

    const fullName = fullNameCombiner(page, ValidUser);
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

  test("The Candidates form should be shown when clicking the down caret button", async ({
    page,
  }) => {
    const ValidUser = createValidUser();
    await addRecord(page, recruitmentPage, ValidUser);
    await recruitmentPage.recruitmentLink.click();

    await recruitmentPage.caretButton.click();
    await recruitmentPage.caretButton.click();
    await expect(recruitmentPage.jobTitle).toBeVisible();
    await expect(recruitmentPage.vacancy).toBeVisible();
    await expect(recruitmentPage.status).toBeVisible();
    await expect(recruitmentPage.method).toBeVisible();
    await expect(recruitmentPage.candidateField).toBeVisible();
    await expect(recruitmentPage.keywords).toBeVisible();
    await expect(recruitmentPage.from).toBeVisible();
    await expect(recruitmentPage.to).toBeVisible();

    const fullName = fullNameCombiner(page, ValidUser);
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
});
