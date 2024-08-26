import { test, expect } from "@playwright/test";
import * as RecruitmentResource from "../../../../helpers/recruitmentResource";
import { LoginPage } from "../../../../pom/loginPage";
let loginPage: LoginPage;

let recruitmentPage: RecruitmentResource.RecruitmentPage;
test.beforeEach(async ({ page }) => {
  recruitmentPage = new RecruitmentResource.RecruitmentPage(page);
  await page.goto("./auth/login");
  loginPage = new LoginPage(page);

  await loginPage.login(
    RecruitmentResource.account.adminAccount.username,
    RecruitmentResource.account.adminAccount.password
  );
  await recruitmentPage.addRecord(RecruitmentResource.ValidUser);
  await recruitmentPage.searchRecord(RecruitmentResource.ValidUser);
});

test.describe("Row option suite", () => {
  test("Show candidate detail by clicking on eye icon", async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const rowName = fullName.locator(recruitmentPage.eye);
    await rowName.click();
    await loginPage.waitForElementVisible(
      recruitmentPage.appStage,
      10000
    );
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
  test("Document download success when click on download button", async ({
    page,
  }) => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const rowName = fullName.locator(recruitmentPage.downloadIcon);
    const downloadPromise = page.waitForEvent("download");
    await rowName.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("correct.docx");
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
});
test.describe("@DC Detail Candidate Suite", () => {
  test.beforeEach(async () => {
    const fullName = recruitmentPage.fullNameCombiner(
      RecruitmentResource.ValidUser
    );
    const rowName = fullName.locator(recruitmentPage.eye);
    await rowName.click();
  });
  test("@DC01 Application Stage and Candidate Profile should be display corresponding data", async () => {
    const dtFullName = recruitmentPage.detailCandidateName(
      RecruitmentResource.ValidUser
    );
    expect(loginPage.waitForElementVisible(dtFullName, 5000));
    expect(
      loginPage.waitForElementVisible(
        recruitmentPage.dtVacancy,
        10000
      )
    );
    expect(
      loginPage.waitForElementVisible(
        recruitmentPage.dtJVacancy,
        10000
      )
    );
    await loginPage.elementShouldContainText(
      recruitmentPage.fileName,
      "correct.docx",
      15000
    );

    const elements = [
      {
        element: recruitmentPage.inputFirstName,
        value: RecruitmentResource.ValidUser.FirstName,
      },
      {
        element: recruitmentPage.inputMiddleName,
        value: RecruitmentResource.ValidUser.MiddleName,
      },
      {
        element: recruitmentPage.inputFirstName,
        value: RecruitmentResource.ValidUser.FirstName,
      },
      {
        element: recruitmentPage.inputEmail,
        value: RecruitmentResource.ValidUser.Email,
      },
      {
        element: recruitmentPage.contactNumber,
        value: RecruitmentResource.ValidUser.ContactNumber,
      },
      {
        element: recruitmentPage.keywords,
        value: RecruitmentResource.ValidUser.Keywords,
      },
      {
        element: recruitmentPage.dateOfApp,
        value: RecruitmentResource.ValidUser.DateOfApp,
      },
      {
        element: recruitmentPage.notes,
        value: RecruitmentResource.ValidUser.Notes,
      },
    ];

    for (const { element, value } of elements) {
      await loginPage.elementValueShouldContain(
        element,
        value,
        15000
      );
    }
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@DC02 User can shortlist a Application Initiated Candidate", async () => {
    await recruitmentPage.shortlistButton.click();
    expect(
      loginPage.waitForElementVisible(recruitmentPage.h6, 10000)
    );
    await loginPage.elementShouldContainText(
      recruitmentPage.h6,
      "Shortlist Candidate",
      15000
    );
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });

  test("@DC03 User can reject a Application Initiated Candidate", async () => {
    await recruitmentPage.rejectButton.click();
    expect(
      loginPage.waitForElementVisible(recruitmentPage.h6, 10000)
    );
    await loginPage.elementShouldContainText(
      recruitmentPage.h6,
      "Reject Candidate",
      15000
    );
    await recruitmentPage.deleteRecord(RecruitmentResource.ValidUser);
  });
});
