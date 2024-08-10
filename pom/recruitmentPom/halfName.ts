import { getFullNameLocator } from "../recruitmentPage";
export function halfName(page, ValidUser) {
    const firstName = ValidUser.firstName;

    const lastName = ValidUser.lastName;  
    const fullName = `${firstName} ${lastName}`;  
  
    return page.locator(getFullNameLocator(fullName));
  }
  