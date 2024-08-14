import {
  test,
  expect,
  Page,
  LoginPage,
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  fullCandidateName,
  account,
  ValidUser,
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
  await addRecord(page, recruitmentPage, ValidUser);
  await recruitmentPage.recruitmentLink.click();
});

test.describe("Candidate Searching Suite", () => {
  test("Filter candidates by Job Title", async ({ page }) => {
    // const vacancy =
    await recruitmentPage.jobTitle.click();
    await recruitmentPage.jobTitleName.click();
    await recruitmentPage.submitButton.click();
    const fullName = fullNameCombiner(page, ValidUser);
    await expect(fullName).toBeVisible(); // lý do chỉ check fullname vì nó Unique
    const firstName = ValidUser.firstName;
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
    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
    const firstName = ValidUser.firstName;
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
    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.status.click();
    await recruitmentPage.statusName.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
    const firstName = ValidUser.firstName;
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
    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.firstName;
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
    const fullName = fullNameCombiner(page, ValidUser);
    await recruitmentPage.keywords.click();
    const keyWords = ValidUser.keywords;
    await recruitmentPage.keywords.fill(keyWords);
    await recruitmentPage.submitButton.click();
    await page.waitForTimeout(5000);
    await expect(fullName).toBeVisible();
    const firstName = ValidUser.firstName;
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
    const fullName = fullNameCombiner(page, ValidUser);
    const formattedFrom = ValidUser.fromDate.split("T")[0];
    const formattedDate = ValidUser.dateOfApp.split("T")[0];
    const formattedTo = ValidUser.toDate.split("T")[0];
    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(formattedFrom);
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
    await page.waitForTimeout(5000);
    const firstName = ValidUser.firstName;
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
    const fullName = fullNameCombiner(page, ValidUser);
    const formattedTo = ValidUser.toDate.split("T")[0];
    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(formattedTo);
    await recruitmentPage.to.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
    await page.waitForTimeout(5000);
    const firstName = ValidUser.firstName;
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
    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.firstName;
    const candidateName = fullCandidateName(page, ValidUser);
    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();
    await expect(fullName).toBeVisible();
    await page.waitForTimeout(5000);
    await deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("Filler candidates by fill all the fields", async ({ page }) => {
    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.firstName;
    const candidateName = fullCandidateName(page, ValidUser);
    const formattedFrom = ValidUser.fromDate.split("T")[0];
    const formattedTo = ValidUser.toDate.split("T")[0];

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
    const keyWords = ValidUser.keywords;
    await recruitmentPage.keywords.fill(keyWords);

    await recruitmentPage.from.click();
    await recruitmentPage.from.fill(formattedFrom);

    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(formattedTo);

    await recruitmentPage.method.click();
    await recruitmentPage.methodName.click();
    await recruitmentPage.submitButton.click();

    await expect(fullName).toBeVisible();
    await page.waitForTimeout(5000);
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
    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.firstName;
    const candidateName = fullCandidateName(page, ValidUser);
    const formattedFrom = ValidUser.fromDate.split("T")[0];
    const formattedTo = ValidUser.toDate.split("T")[0];
    const keyWords = ValidUser.keywords;

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
    await recruitmentPage.from.fill(formattedFrom);
    await recruitmentPage.to.click();
    await recruitmentPage.to.fill(formattedTo);
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

    await page.waitForTimeout(5000);
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
    await recruitmentPage.caretButton.click();
    await page.waitForTimeout(5000);

    await expect(recruitmentPage.jobTitle).toBeHidden();
    await expect(recruitmentPage.vacancy).toBeHidden();
    await expect(recruitmentPage.status).toBeHidden();
    await expect(recruitmentPage.method).toBeHidden();
    await expect(recruitmentPage.candidateField).toBeHidden();
    await expect(recruitmentPage.keywords).toBeHidden();
    await expect(recruitmentPage.from).toBeHidden();
    await expect(recruitmentPage.to).toBeHidden();

    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.firstName;
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
    await recruitmentPage.caretButton.click();
    await recruitmentPage.caretButton.click();

    await page.waitForTimeout(5000);

    await expect(recruitmentPage.jobTitle).toBeVisible();
    await expect(recruitmentPage.vacancy).toBeVisible();
    await expect(recruitmentPage.status).toBeVisible();
    await expect(recruitmentPage.method).toBeVisible();
    await expect(recruitmentPage.candidateField).toBeVisible();
    await expect(recruitmentPage.keywords).toBeVisible();
    await expect(recruitmentPage.from).toBeVisible();
    await expect(recruitmentPage.to).toBeVisible();

    const fullName = fullNameCombiner(page, ValidUser);
    const firstName = ValidUser.firstName;
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
