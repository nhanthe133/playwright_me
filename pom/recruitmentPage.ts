import { Locator, Page, expect } from "@playwright/test";
import recruitmentPageLocator from "../locators/recruitmentPageLocator.json";
import inputRecruitment from "../locators/inputRecruitment.json";
import { waitForElementVisible } from "../helpers/utils";

export type User = {
  FirstName: string;
  LastName?: string;
  Email?: string;
  MiddleName?: string;
  ContactNumber?: string;
  Keywords?: string;
  DateOfApp?: string;
  Notes?: string;
};

export type UserRequire = {
  FirstName: string;
  LastName?: string;
  Email?: string;
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

// export function fullNameCombiner(page, ValidUser) {
//   const firstName = ValidUser.firstName;
//   const middleName = ValidUser.middleName ? `${ValidUser.middleName} ` : "";
//   const lastName = ValidUser.lastName;
//   const fullName = `${firstName} ${middleName}${lastName}`;
//   return page.locator(getFullNameRowLocator(fullName));
// }
export function fullNameCombiner(page, ValidUser) {
  const firstName = ValidUser.FirstName;
  const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : "";
  const lastName = ValidUser.LastName;
  const fullName = `${firstName} ${middleName}${lastName}`;
  return page.locator(getFullNameRowLocator(fullName));
}
export function halfNameCombiner(page, ValidUser) {
  const firstName = ValidUser.FirstName;
  const lastName = ValidUser.LastName;
  const halfName = `${firstName}  ${lastName}`;
  return page.locator(getFullNameRowLocator(halfName));
}
// export function fullCandidateName(page, ValidUser) {
//   const firstName = ValidUser.firstName;
//   const middleName = ValidUser.middleName ? `${ValidUser.middleName} ` : "";
//   const lastName = ValidUser.lastName;
//   const fullName = `${firstName} ${middleName}${lastName}`;
//   return page.locator(getFullCandidateName(fullName));
// }
export function fullCandidateName(page, ValidUser) {
  const firstName = ValidUser.FirstName;
  const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : "";
  const lastName = ValidUser.LastName;
  const fullName = `${firstName} ${middleName}${lastName}`;
  return page.locator(getFullCandidateName(fullName));
}
export function halfCandidateName(page, ValidUser) {
  const firstName = ValidUser.FirstName;
  const lastName = ValidUser.LastName;
  const halfName = `${firstName}  ${lastName}`;
  return page.locator(getHalfCandidateName(halfName));
}

export function detailCandidateName(page, ValidUser) {
  const firstName = ValidUser.FirstName;
  const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : "";
  const lastName = ValidUser.LastName;
  const fullName = `${firstName} ${middleName}${lastName}`;
  return page.locator(getDetailCandidateName(fullName));
}
export function getDetailCandidateName(fullName: string) {
  // return `//div[@role="listbox"]//div[@role="option"]//span[text()="${fullName}"]`;
  return `//p[contains(@class, "oxd-text oxd-text--p") and text()="${fullName}"]`
}
export function getHiringName(hireName:any) {
  return `//div/child::span[text()="${hireName}"]`
}

export async function addRecord(page, recruitmentPage, ValidUser) {
  await recruitmentPage.recruitmentLink.click();
  await recruitmentPage.addButton.click();
  await recruitmentPage.dateOfApp.clear();
  await recruitmentPage.vacancy.click();
  await recruitmentPage.vacancyName.click();

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    recruitmentPage.browseFile.click(),
  ]);
  await fileChooser.setFiles("files/correct.docx");

  // const fully: User = {
  //   FirstName: ValidUser.firstName,
  //   LastName: ValidUser.lastName,
  //   Email: ValidUser.email,
  //   MiddleName: ValidUser.middleName,
  //   ContactNumber: ValidUser.contactNumber,
  //   Keywords: ValidUser.keywords,
  //   DateOfApp: ValidUser.dateOfApp,
  //   Notes: ValidUser.notes,
  // };

  const fully: User = structuredClone(ValidUser);


  await fillTheFields(fully, page);
  await recruitmentPage.submitAdd.click();
}

export async function deleteRecord(
  fullName: any, //for what? là nguyên liệu để tìm row
  firstName: any, // nhập vào để nhận gợi ý.
  candidateName, // đây là gợi ý
  page: any,
  recruitmentPage: any
) {
  await recruitmentPage.recruitmentLink.click();
  await recruitmentPage.candidateField.click();
  await recruitmentPage.candidateField.fill(firstName); //fill first name
  await candidateName.click(); // chọn gợi ý
  await recruitmentPage.submitButton.click();
  // await expect(fullName).toBeVisible();//?why
  const rowName = fullName.locator(recruitmentPage.trashButton); // nấu locator cho rowname thùng rác
  // await waitForElementVisible(rowName, 30000);
  await rowName.click(); // nhấp vào thùng rác
  await recruitmentPage.deleteButton.click();
  await expect(recruitmentPage.successMessage).toBeVisible();
}

export async function searchRecord(ValidUser, page, recruitmentPage) {
    const firstName = ValidUser.FirstName;
    await recruitmentPage.recruitmentLink.click();
    await recruitmentPage.candidateField.click();
    await recruitmentPage.candidateField.fill(firstName); //fill first name
    const candidateName = fullCandidateName(page, ValidUser);
    await candidateName.click();
    await recruitmentPage.submitButton.click();
}


export class RecruitmentPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  get ultimateDelete() {
    return this.page.locator(recruitmentPageLocator.ultimateDelete);
  }
  get deleteSelected() {
    return this.page.locator(recruitmentPageLocator.deleteSelected);
  }
  get cancelDelete() {
    return this.page.locator(recruitmentPageLocator.cancelDelete);
  }
  get download() {
    return this.page.locator(recruitmentPageLocator.download);
  }
  get confirmButton() {
    return this.page.locator(recruitmentPageLocator.confirmButton);
  }
  get hiring() {
    return this.page.locator(recruitmentPageLocator.hiring);
  }
  get hireName() {
    return this.page.locator(recruitmentPageLocator.hireName);
  }
  get replaceFile() {
    return this.page.locator(recruitmentPageLocator.replaceFile);
  }
  get deleteFile() {
    return this.page.locator(recruitmentPageLocator.deleteFile);
  }
  get switch() {
    return this.page.locator(recruitmentPageLocator.switch);
  }
  get h6() {
    return this.page.locator(recruitmentPageLocator.h6);
  }
  get rejectButton() {
    return this.page.locator(recruitmentPageLocator.rejectButton);
  }
  get shortlistButton() {
    return this.page.locator(recruitmentPageLocator.shortlistButton);
  }
  get eye() {
    return this.page.locator(recruitmentPageLocator.eye);
  }
  get dtVacancy() {
    return this.page.locator(recruitmentPageLocator.dtVacancy);
  }
  get dtJVacancy() {
    return this.page.locator(recruitmentPageLocator.dtJVacancy);
  }
  get fileName() {
    return this.page.locator(recruitmentPageLocator.fileName);
  }
  get downloadIcon() {
    return this.page.locator(recruitmentPageLocator.downloadIcon);
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
  get checkBox() {
    return this.page.locator(recruitmentPageLocator.checkBox);
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
  get seniorQA() {
    return this.page.locator(recruitmentPageLocator.seniorQA);
  }
  get emptyVacancy() {
    return this.page.locator(recruitmentPageLocator.emptyVacancy);
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
