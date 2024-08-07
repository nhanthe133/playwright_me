import { Locator, Page } from '@playwright/test';
import recruitmentPageLocator from '../locators/recruitmentPageLocator.json';
import { pressKeyOnLocator } from '../utils/pressKeyOnLocator';
export class RecruitmentPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async input(
        firstName?: string,
        lastName?: string,
        email?: string,
        middleName?: string,
        contactNumber?: string,
        keywords?: string,
        dateOfApp?: string,
        notes?: string,
        _submit: boolean = true
        ) 
    {
        if (firstName) {
            await this.inputFirstName.fill(firstName)
        }
        
        if (lastName) {
            await this.inputLastName.fill(lastName)
        }
        if (email) {
            await this.inputEmail.fill(email)
        }
        if (middleName) {
            await this.inputMiddleName.fill(middleName)
        }
        if (contactNumber) {
            await this.contactNumber.fill(contactNumber)
        }
        if (keywords) {
            await this.keywords.fill(keywords)
        }
        if (dateOfApp) {
            await this.dateOfApp.fill(dateOfApp)
        }
        if (notes) {
            await this.notes.fill(notes)
        }
        if (_submit) {
            await this.submitAdd.click()
        }
    }
    get successMessage() {
        return this.page.locator(recruitmentPageLocator.success)
    }
    get browseFile() {
        return this.page.locator(recruitmentPageLocator.browseFile)
    }
    get vacancyName() {
        return this.page.locator(recruitmentPageLocator.vacancyName)
    }
    get notes() {
        return this.page.locator(recruitmentPageLocator.notes)
    }
    get vacancy() {
        return this.page.locator(recruitmentPageLocator.vacancy)
    }
    get dateOfApp() {
        return this.page.locator(recruitmentPageLocator.dateOfApp)
    }
    get keywords() {
        return this.page.locator(recruitmentPageLocator.keyWords)
    }
    get contactNumber() {
        return this.page.locator(recruitmentPageLocator.contactNumber)
    }
    get recruitmentLink() {
        return this.page.getByRole('link', { name: 'Recruitment' });
    }
    
    get recruitmentHeader() {
        return this.page.locator(recruitmentPageLocator.recruitmentHeader)
    }

    get addButton() {
        return this.page.locator(recruitmentPageLocator.addButton);
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

    // this is backup plan for upper addButton
    // get addButton() {
    //     return this.page.getByRole('button').and(this.page.getByText(' Add '));
    // } 




}