import { test, expect, type Page } from "@playwright/test";
import loginData from "../locators/loginPageLocator.json"
import inputRecruitment from "../locators/inputRecruitment.json"

import ValidUser from "../data/fakeData";

// export type User = {
//     Username: string,
//     Password?: string,
// }
export type User = {
    firstName: string,
    lastName?: string,
    email?: string,
    middleName?: string,
    contactNumber?: string,
    keywords?: string,
    dateOfApp?: string,
    notes?: string,
    // _submit: boolean = true
  }
const fully:User = {
    firstName:ValidUser.firstName,
    lastName: ValidUser.lastName,
    middleName: ValidUser.middleName,
    email: ValidUser.email,
    contactNumber: ValidUser.contactNumber,
    keywords: ValidUser.keywords,
    dateOfApp: ValidUser.dateOfApp,
    notes: ValidUser.notes
  }

// const a:User = {
//     Username:ValidUser.firstName
// }

// const b:User = {
//     Username: "tèo em",
//     Password: "nguyễn"
// }

// export function abc(user:User){
//     for (let prop in user){
//         console.log(loginData[`input${prop}`], user[prop])
//     }
// }

export function abc(user:User){
    for (let prop in user){
        console.log(inputRecruitment[`input${prop}`], user[prop])
    }
  }

test("test something", async ({ page }) => {
    abc(fully)
    // abc(b)
})