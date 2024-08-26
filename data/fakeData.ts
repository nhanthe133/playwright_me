import { faker } from "@faker-js/faker";
import { format } from 'date-fns'
export interface User {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  ContactNumber: string;
  Keywords: string;
  DateOfApp: string;
  Notes: string;
}
export type UserRequire = {
  FirstName: string;
  LastName?: string;
  Email?: string;
};

export function createValidUser(): User {
  const phoneFormat = "###-###-####";
  const dateApp = faker.date.recent();
  const DateOfApp = format(dateApp, 'yyyy-MM-dd');
  return {
    FirstName: faker.person.firstName(),
    MiddleName: faker.person.middleName(),
    LastName: faker.person.lastName(),
    Email: faker.internet.email(),
    ContactNumber: faker.phone.number(phoneFormat),
    Keywords: faker.lorem.words(2),
    DateOfApp,
    Notes: faker.lorem.paragraph()
  };
}

export function createRequiredValidUser(): UserRequire {
  return {
    FirstName: faker.person.firstName(),
    LastName: faker.person.lastName(),
    Email: faker.internet.email(),
  };
}

const ValidUser = createValidUser();

export default ValidUser;
