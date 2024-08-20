import { test, expect } from "@playwright/test";

import * as RecruitmentResource from "../../../../helpers/recruitmentResource";
import {
  detailCandidateName,
  searchRecord,
} from "../../../../pom/recruitmentPage";

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
  await RecruitmentResource.addRecord(page, recruitmentPage, RecruitmentResource.ValidUser);
  await searchRecord(RecruitmentResource.ValidUser, page, recruitmentPage);
});

test.describe("Row option suite", () => {
  test("Show candidate detail by clicking on eye icon", async ({ page }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const rowName = fullName.locator(recruitmentPage.eye);
    await rowName.click();
    expect(RecruitmentResource.waitForElementVisible(recruitmentPage.appStage, 10000));


    //expect them thông tin -> đó là việc của các bước dưới.
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);


    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );

    
  });

  test("Document download success when click on download button", async ({
    page,
  }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const rowName = fullName.locator(recruitmentPage.downloadIcon);
    const downloadPromise = page.waitForEvent("download");
    await rowName.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("correct.docx");
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });
});
test.describe("Detail Candidate Suite", () => {
  test.beforeEach(async ({ page }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const rowName = fullName.locator(recruitmentPage.eye);
    await rowName.click();
  });

  test("Application Stage and Candidate Profile should be display corresponding data", async ({
    page,
  }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    const dtFullName = detailCandidateName(page, RecruitmentResource.ValidUser);
    expect(RecruitmentResource.waitForElementVisible(dtFullName, 5000));
    expect(RecruitmentResource.waitForElementVisible(recruitmentPage.dtVacancy, 10000));
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputFirstName, RecruitmentResource.ValidUser.FirstName, 15000);
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputMiddleName, RecruitmentResource.ValidUser.MiddleName, 15000);
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputFirstName, RecruitmentResource.ValidUser.FirstName, 15000);
    expect(RecruitmentResource.waitForElementVisible(recruitmentPage.dtJVacancy, 10000));
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.inputEmail, RecruitmentResource.ValidUser.Email, 15000);
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.contactNumber, RecruitmentResource.ValidUser.ContactNumber, 15000);
    await RecruitmentResource.elementShouldContainText(recruitmentPage.fileName, "correct.docx", 15000);
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.keywords, RecruitmentResource.ValidUser.Keywords, 15000);
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.dateOfApp, RecruitmentResource.ValidUser.DateOfApp, 15000);
    await RecruitmentResource.elementValueShouldContain(recruitmentPage.notes, RecruitmentResource.ValidUser.Notes, 15000);
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("User can shortlist a Application Initiated Candidate", async ({
    page,
  }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    await recruitmentPage.shortlistButton.click();
    expect(RecruitmentResource.waitForElementVisible(recruitmentPage.h6, 10000));
    // await expect(recruitmentPage.h6).toHaveText("Shortlist Candidate");
    await RecruitmentResource.elementShouldContainText(recruitmentPage.h6, "Shortlist Candidate", 15000);
    
    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });

  test("User can reject a Application Initiated Candidate", async ({
    page,
  }) => {
    const fullName = RecruitmentResource.fullNameCombiner(page, RecruitmentResource.ValidUser);
    await recruitmentPage.rejectButton.click();
    expect(RecruitmentResource.waitForElementVisible(recruitmentPage.h6, 10000));
    // await expect(recruitmentPage.h6).toHaveText("Reject Candidate");
    await RecruitmentResource.elementShouldContainText(recruitmentPage.h6, "Reject Candidate", 15000);

    const firstName = RecruitmentResource.ValidUser.FirstName;
    const candidateName = RecruitmentResource.fullCandidateName(page, RecruitmentResource.ValidUser);
    await RecruitmentResource.deleteRecord(
      fullName,
      firstName,
      candidateName,
      page,
      recruitmentPage
    );
  });
});
