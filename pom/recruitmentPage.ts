import { Locator, Page, expect } from "@playwright/test";
import recruitmentPageLocator from "../locators/recruitmentPageLocator.json";
import inputRecruitment from "../locators/inputRecruitment.json";
import { waitForElementVisible } from "../utils/waitForVisible";

export type User = {
  firstName: string;
  lastName?: string;
  email?: string;
  middleName?: string;
  contactNumber?: string;
  keywords?: string;
  dateOfApp?: string;
  notes?: string;
};

export async function fillTheFields(user: User, page) {
  for (let prop in user) {
    await page.locator(inputRecruitment[`input${prop}`]).fill(user[prop]);
  }
}
export function getFullNameRowLocator(fullName: string) {
  return `//div[contains(@class, "oxd-table-row") and contains(., "${fullName}")]`;
}
export function getFullCandidateName(fullName: string) {
  return `//div[contains(@class, "oxd-autocomplete-option")]/child::span[text()="${fullName}"]`;
}
export function getHalfCandidateName(halfName: string) {
  return `//div[@role="listbox"]//div[@role="option"]//span[text()="${halfName}"]`;
}

export function fullNameCombiner(page, ValidUser) {
  const firstName = ValidUser.firstName;
  const middleName = ValidUser.middleName ? `${ValidUser.middleName} ` : "";
  const lastName = ValidUser.lastName;
  const fullName = `${firstName} ${middleName}${lastName}`;
  return page.locator(getFullNameRowLocator(fullName));
}
export function halfNameCombiner(page, ValidUser) {
  const firstName = ValidUser.firstName;
  const lastName = ValidUser.lastName;
  const halfName = `${firstName} ${lastName}`;
  return page.locator(getFullNameRowLocator(halfName));
}
export function fullCandidateName(page, ValidUser) {
  const firstName = ValidUser.firstName;
  const middleName = ValidUser.middleName ? `${ValidUser.middleName} ` : "";
  const lastName = ValidUser.lastName;
  const fullName = `${firstName} ${middleName}${lastName}`;
  return page.locator(getFullCandidateName(fullName));
}
export function halfCandidateName(page, ValidUser) {
  const firstName = ValidUser.firstName;
  const lastName = ValidUser.lastName;
  const halfName = `${firstName} ${lastName}`;
  return page.locator(getHalfCandidateName(halfName));
}

export async function addRecord(page, recruitmentPage, ValidUser) {
  await recruitmentPage.recruitmentLink.click();
  await recruitmentPage.addButton.click();
  const formattedDate = ValidUser.dateOfApp.split("T")[0];
  await recruitmentPage.dateOfApp.clear();
  await recruitmentPage.vacancy.click();
  await recruitmentPage.vacancyName.click();

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    recruitmentPage.browseFile.click(),
  ]);
  await fileChooser.setFiles("files/correct.docx");

  const fully: User = {
    firstName: ValidUser.firstName,
    lastName: ValidUser.lastName,
    email: ValidUser.email,
    middleName: ValidUser.middleName,
    contactNumber: ValidUser.contactNumber,
    keywords: ValidUser.keywords,
    dateOfApp: formattedDate,
    notes: ValidUser.notes,
  };

  await fillTheFields(fully, page);
  await recruitmentPage.submitAdd.click();
}

export async function deleteRecord(
  fullName: any,
  firstName: any,
  candidateName,
  page: any,
  recruitmentPage: any
) {
  await recruitmentPage.recruitmentLink.click();
  await recruitmentPage.candidateField.click();
  await recruitmentPage.candidateField.fill(firstName); //fill first name
  await candidateName.click();
  await recruitmentPage.submitButton.click();
  await expect(fullName).toBeVisible();
  const rowName = fullName.locator(recruitmentPage.trashButton);
  await waitForElementVisible(rowName);
  await rowName.click();
  await recruitmentPage.deleteButton.click();
  await expect(recruitmentPage.successMessage).toBeVisible();
}


export class RecruitmentPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get vacancyRowName() {
    return this.page.locator(recruitmentPageLocator.vacancyRowName);
  }
  get from() {
    return this.page.locator(recruitmentPageLocator.from);
  }
  get to() {
    return this.page.locator(recruitmentPageLocator.to);
  }
  get trashButton() {
    return this.page.locator(recruitmentPageLocator.trashButton);
  }
  get candidateField() {
    return this.page.locator(recruitmentPageLocator.candidateField);
  }
  get deleteButton() {
    return this.page.locator(recruitmentPageLocator.deleteButton);
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
  get method() {
    return this.page.locator(recruitmentPageLocator.method);
  }
  get methodName() {
    return this.page.locator(recruitmentPageLocator.methodName);
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
  get resetButton() {
    return this.page.locator(recruitmentPageLocator.resetButton);
  }
  get caretButton() {
    return this.page.locator(recruitmentPageLocator.caretButton);
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
}
