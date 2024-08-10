import { Locator, Page } from "@playwright/test";
import recruitmentPageLocator from "../locators/recruitmentPageLocator.json";


export function getFullNameLocator(fullName: string) {
  return `div.oxd-table-row:has-text("${fullName}")`;
}

export function getFullCandidateName(fullName: string) {
  return `//div/child::span[text()='${fullName}']`;
}

export class RecruitmentPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  row(fullName: any) {
    return `div.oxd-table-row:has-text("${fullName}")`;
  }

  async inputFull(
    firstName: string,
    lastName?: string,
    email?: string,
    middleName?: string,
    contactNumber?: string,
    keywords?: string,
    dateOfApp?: string,
    notes?: string,
    _submit: boolean = true
  ) {
    // const user = createValidUser();
    const fields = [
      { field: this.inputFirstName, value: firstName },
      { field: this.inputMiddleName, value: middleName },
      { field: this.inputLastName, value: lastName },
      { field: this.inputEmail, value: email },
      { field: this.contactNumber, value: contactNumber },
      { field: this.keywords, value: keywords },
      { field: this.dateOfApp, value: dateOfApp },
      { field: this.notes, value: notes },
    ];

    for (const { field, value } of fields) {
      if (value) {
        await field.fill(value);
      }
    }
    if (_submit) {
      await this.submitAdd.click();
    }
  }

  async inputRequired(
    firstName?: string,
    lastName?: string,
    email?: string,
    _submit: boolean = true
  ) {
    const fields = [
      { field: this.inputFirstName, value: firstName },
      { field: this.inputLastName, value: lastName },
      { field: this.inputEmail, value: email },
    ];
    for (const { field, value } of fields) {
      if (value) {
        await field.fill(value);
      }
    }
    if (_submit) {
      await this.submitAdd.click();
    }
  }

  async inputInvalidEmail(email?: string, _submit: boolean = true) {
    const fields = [{ field: this.inputEmail, value: email }];
    for (const { field, value } of fields) {
      if (value) {
        await field.fill(value);
      }
    }
    if (_submit) {
      await this.submitAdd.click();
    }
  }

  async inputInvalidDate(dateOfApp?: string, _submit: boolean = true) {
    const fields = [{ field: this.dateOfApp, value: dateOfApp }];
    for (const { field, value } of fields) {
      if (value) {
        await field.fill(value);
      }
    }
    if (_submit) {
      await this.submitAdd.click();
    }
  }

  get trashButton() {
    return this.page.locator(recruitmentPageLocator.trashButton);
  }
  get vipCandidate() {
    return this.page.locator(recruitmentPageLocator.vipCandidate);
  }
  get candidateName() {
    return this.page.locator(recruitmentPageLocator.candidateName);
  }
  get deleteButton() {
    return this.page.locator(recruitmentPageLocator.deleteButton)
  }
  get status() {
    return this.page.locator(recruitmentPageLocator.status);
  }
  get statusName() {
    return this.page.locator(recruitmentPageLocator.statusName);
  }
  get jobTitle() {
    return this.page.locator(recruitmentPageLocator.jobTitle);
  }
  get cancelButton() {
    return this.page.locator(recruitmentPageLocator.cancelButton);
  }
  get errorDate() {
    return this.page.locator(recruitmentPageLocator.errorDate);
  }
  get errorFile() {
    return this.page.locator(recruitmentPageLocator.errorFile);
  }
  get errorFirstName() {
    return this.page.locator(recruitmentPageLocator.errorFirstName);
  }
  get errorLastName() {
    return this.page.locator(recruitmentPageLocator.errorLastName);
  }
  get errorEmail() {
    return this.page.locator(recruitmentPageLocator.errorEmail);
  }
  get successMessage() {
    return this.page.locator(recruitmentPageLocator.success);
  }
  get browseFile() {
    return this.page.locator(recruitmentPageLocator.browseFile);
  }
  get vacancyName() {
    return this.page.locator(recruitmentPageLocator.vacancyName);
  }
  get jobTitleName() {
    return this.page.locator(recruitmentPageLocator.jobTitleName);
  }
  get notes() {
    return this.page.locator(recruitmentPageLocator.notes);
  }
  get vacancy() {
    return this.page.locator(recruitmentPageLocator.vacancy);
  }
  get dateOfApp() {
    return this.page.locator(recruitmentPageLocator.dateOfApp);
  }
  get keywords() {
    return this.page.locator(recruitmentPageLocator.keyWords);
  }
  get contactNumber() {
    return this.page.locator(recruitmentPageLocator.contactNumber);
  }
  get recruitmentLink() {
    return this.page.getByRole("link", { name: "Recruitment" });
  }

  get recruitmentHeader() {
    return this.page.locator(recruitmentPageLocator.recruitmentHeader);
  }
  get addButton() {
    return this.page.locator(recruitmentPageLocator.addButton);
  }
  get submitButton() {
    return this.page.locator(recruitmentPageLocator.submitButton);
  }
  get inputFirstName() {
    return this.page.locator(recruitmentPageLocator.inputFirstName);
  }
  get inputMiddleName() {
    return this.page.locator(recruitmentPageLocator.inputMiddleName);
  }
  get inputLastName() {
    return this.page.locator(recruitmentPageLocator.inputLastName);
  }
  get inputEmail() {
    return this.page.locator(recruitmentPageLocator.inputEmail);
  }
  get submitAdd() {
    return this.page.locator(recruitmentPageLocator.submitAdd);
  }
  get appStage() {
    return this.page.locator(recruitmentPageLocator.appStage);
  }
  get trashBin() {
    return this.page.locator(recruitmentPageLocator.trashBin);
  }

  // this is backup plan for upper addButton
  // get addButton() {
  //     return this.page.getByRole('button').and(this.page.getByText(' Add '));
  // }
}
