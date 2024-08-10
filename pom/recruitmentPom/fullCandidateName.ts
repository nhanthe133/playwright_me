import { getFullCandidateName } from "../recruitmentPage";

export function fullCandidateName(page, ValidUser) {
  
    const firstName = ValidUser.firstName;
    const middleName = ValidUser.middleName ? `${ValidUser.middleName} ` : '';  
    const lastName = ValidUser.lastName;  
    const fullName = `${firstName} ${middleName}${lastName}`;  
  
    // return page.locator(`div.oxd-table-row:has-text("${fullName}")`);
    return page.locator(getFullCandidateName(fullName));
  }
  