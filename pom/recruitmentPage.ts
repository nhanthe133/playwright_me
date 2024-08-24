import { Page, expect } from "@playwright/test";
import recruitmentPageLocator from "../locators/recruitmentPageLocator.json";
import loginPageLocator from "../locators/loginPageLocator.json";
import inputRecruitment from "../locators/inputRecruitment.json";
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

export class RecruitmentPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clearCandidateInfo(){
    const clears = [
      this.inputFirstName,
      this.inputMiddleName,
      this.inputLastName,
      this.inputEmail,
      this.contactNumber,
      this.keywords,
      this.dateOfApp,
      this.notes
  ];
  for (const clear of clears) {
      await clear.clear();
  }
  }

  async fillTheFields(user: User) {
    for (const prop in user) {
      await this.page.locator(inputRecruitment[`input${prop}`]).fill(user[prop]);
    }
  }
  
  getFullNameRowLocator(fullName: string) {
    return `//div[contains(@class, "oxd-table-row") and contains(., "${fullName}")]`;
  }
  getFullCandidateName(fullName: string) {
    return `//div[contains(@class, "oxd-autocomplete-option")]/child::span[text()="${fullName}"]`;
  }
  getHalfCandidateName(halfName: string) {
    return `//div[@role="listbox"]//div[@role="option"]//span[text()="${halfName}"]`;
  }
  
  fullNameCombiner(ValidUser) {
    const firstName = ValidUser.FirstName;
    const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : "";
    const lastName = ValidUser.LastName;
    const fullName = `${firstName} ${middleName}${lastName}`;
    return this.page.locator(this.getFullNameRowLocator(fullName));
  }
  halfNameCombiner(ValidUser) {
    const firstName = ValidUser.FirstName;
    const lastName = ValidUser.LastName;
    const halfName = `${firstName}  ${lastName}`;
    return this.page.locator(this.getFullNameRowLocator(halfName));
  }
  
  fullCandidateName(ValidUser) {
    const firstName = ValidUser.FirstName;
    const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : "";
    const lastName = ValidUser.LastName;
    const fullName = `${firstName} ${middleName}${lastName}`;
    return this.page.locator(this.getFullCandidateName(fullName));
  }
  halfCandidateName(ValidUser) {
    const firstName = ValidUser.FirstName;
    const lastName = ValidUser.LastName;
    const halfName = `${firstName}  ${lastName}`;
    return this.page.locator(this.getHalfCandidateName(halfName));
  }
  
  detailCandidateName(ValidUser) {
    const firstName = ValidUser.FirstName;
    const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : "";
    const lastName = ValidUser.LastName;
    const fullName = `${firstName} ${middleName}${lastName}`;
    return this.page.locator(this.getDetailCandidateName(fullName));
  }
  getDetailCandidateName(fullName: string) {
    // return `//div[@role="listbox"]//div[@role="option"]//span[text()="${fullName}"]`;
    return `//p[contains(@class, "oxd-text oxd-text--p") and text()="${fullName}"]`
  }
  getHiringName(hireName) {
    return `//div/child::span[text()="${hireName}"]`
  }

  // async deleteRecord(
  //   ValidUser
  // ) {
  //   const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : " ";
  //   const subname = `${ValidUser.FirstName} ${middleName}${ValidUser.LastName}`;
  //   const candidateName = this.page.locator(this.getFullCandidateName(subname));
  //   const fullName = this.page.locator(this.getFullNameRowLocator(subname));
  //   await this.recruitmentLink.click();
  //   await this.candidateField.click();
  //   await this.candidateField.fill(ValidUser.FirstName); //fill first name
  //   await candidateName.click(); // chọn gợi ý
  //   await this.submitButton.click();
  //   const rowName = fullName.locator(this.trashButton); // nấu locator cho rowname thùng rác
  //   await rowName.click(); // nhấp vào thùng rác
  //   await this.deleteButton.click();
  //   await expect(this.successMessage).toBeVisible();
  // }

  async clickCheckboxes(users) {
    for (const user of users) {
        const fullName = this.fullNameCombiner(user);
        const rowName = fullName.locator(this.checkBox); // nấu locator cho rowname checkbox
        await rowName.click(); // nhấp vào checkbox
    }
}
    async clickNFill(object, firstName) {
      await object.click();
      await object.fill(firstName);
    }

  
  async deleteRecord(
    ValidUser
  ) {
    const middleName = ValidUser.MiddleName ? `${ValidUser.MiddleName} ` : " ";
    const subname = `${ValidUser.FirstName} ${middleName}${ValidUser.LastName}`;
    const candidateName = this.page.locator(this.getFullCandidateName(subname));
    const fullName = this.page.locator(this.getFullNameRowLocator(subname));
    await this.recruitmentLink.click();
    await this.candidateField.click();
    await this.candidateField.fill(ValidUser.FirstName); //fill first name
    await candidateName.nth(0).click(); // chọn gợi ý
    // await this.submitButton.click();
    const rowName = fullName.locator(this.trashButton);
    const rowNames = await rowName.count();  // nấu locator cho rowname thùng rác
    for(let i = 0; i < rowNames; i++){
        // const rowName = fullName.locator(this.trashButton); // nấu locator cho rowname thùng rác
        await this.candidateField.click();
        await this.candidateField.clear();
        await this.candidateField.fill(ValidUser.FirstName); //fill first name
        await candidateName.nth(0).click();
        await this.submitButton.click();
        await rowName.nth(0).click(); // nhấp vào thùng rác
        await this.deleteButton.click();
        await expect(this.successMessage).toBeVisible();
    }
  }


    async searchRecord(ValidUser) {
    const firstName = ValidUser.FirstName;
    await this.recruitmentLink.click();
    await this.candidateField.click();
    await this.candidateField.fill(firstName); //fill first name
    const candidateName = this.fullCandidateName(ValidUser);
    await candidateName.click();
    await this.submitButton.click();
}

  async addRecord(ValidUser) {
  await this.recruitmentLink.click();
  await this.addButton.click();
  await this.dateOfApp.clear();
  await this.vacancy.click();
  await this.vacancyName.click();
  const [fileChooser] = await Promise.all([
    this.page.waitForEvent("filechooser"),
    this.browseFile.click(),
  ]);
  await fileChooser.setFiles("files/correct.docx");
  const fully: User = structuredClone(ValidUser);
  await this.fillTheFields(fully);
  await this.submitAdd.click();
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
  get inputUsername() {
    return this.page.locator(loginPageLocator.inputUsername);
  }
  get inputPassword() {
    return this.page.locator(loginPageLocator.inputPassword);
  }
  get loginButton() {
    return this.page.locator(loginPageLocator.submitButton);
  }
}
