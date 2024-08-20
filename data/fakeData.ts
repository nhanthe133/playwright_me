import { faker } from "@faker-js/faker";
// import { format } from "path";
import { format } from 'date-fns'
// import { UserRequire } from "../pom/recruitmentPage";


// Define the interfaces for the data types
export interface User {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  ContactNumber: string;
  Keywords: string;
  DateOfApp: string;
  // FromDate: string;
  // ToDate: string;
  Notes: string;
}
export type UserRequire = {
  FirstName: string;
  LastName?: string;
  Email?: string;
};
// export interface Email {
//   email: string;
// }

// export interface InvalidDate {
//   dateOfApp: Date;
// }

export function createValidUser(): User {
  const phoneFormat = "###-###-####";
  const dateApp = faker.date.between({
    from: "2024-08-07",
    to: "2024-08-08",
  })
  // const from = faker.date.between({
  //   from: "2024-08-04T00:00:00.000Z",
  //   to: "2024-08-07T00:00:00.000Z",
  // })
  // const to = faker.date
  //     .between({
  //       from: "2024-08-08T00:00:00.000Z",
  //       to: "2024-08-10T00:00:00.000Z",
  //     })

  // const dateOfApp = format(dateApp, 'yyyy-MM-dd');
  // const fromDate = format(from, 'yyyy-MM-dd');
  // const toDate = format(to, 'yyyy-MM-dd');

  const DateOfApp = format(dateApp, 'yyyy-MM-dd');
  // const FromDate = format(from, 'yyyy-MM-dd');
  // const ToDate = format(to, 'yyyy-MM-dd');

  // return {
  //   firstName: faker.person.firstName(),
  //   middleName: faker.person.middleName(),
  //   lastName: faker.person.lastName(),
  //   email: faker.internet.email(),
  //   contactNumber: faker.phone.number(phoneFormat),
  //   keywords: faker.lorem.words(2),
  //   dateOfApp,
  //   fromDate,
  //   toDate,
  //   notes: faker.lorem.paragraph(),
  // };
  return {
    FirstName: faker.person.firstName(),
    MiddleName: faker.person.middleName(),
    LastName: faker.person.lastName(),
    Email: faker.internet.email(),
    ContactNumber: faker.phone.number(phoneFormat),
    Keywords: faker.lorem.words(2),
    DateOfApp,
    // FromDate,
    // ToDate,
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

// export function createInvalidEMail(): Email {
//   return {
//     email: faker.random.word() + "@!@#$.com",
//   };
// }

// export function createInvalidDate(): InvalidDate {
//   return {
//     dateOfApp: faker.date.past(),
//   };
// }

const ValidUser = createValidUser();

export default ValidUser;
