import { faker } from '@faker-js/faker';  
import { format } from 'path';

// Define the interfaces for the data types  
export interface User {  
  firstName: string;
  middleName: string;
  lastName: string;  
  email: string; 
  contactNumber: string;
  keywords: string;
  dateOfApp: string;
  fromDate: Date;
  toDate: Date;
  notes: string; 
}  

export interface Email {
  email: string
}

export interface InvalidDate {
  dateOfApp: Date;
}

export function createValidUser(): User {  
  const format = "###-###-####";
  return {  
    firstName: faker.person.firstName(), 
    middleName: faker.person.middleName(), 
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    contactNumber: faker.phone.number(format),
    keywords: faker.lorem.words(2),
    dateOfApp: faker.date.past().toISOString(),
    fromDate: faker.date.between({
      from: '2024-08-04T00:00:00.000Z',
       to: '2025-08-07T00:00:00.000Z'
      }),
    toDate: faker.date.between({
        from: '2024-08-08T00:00:00.000Z',
         to: '2025-08-10T00:00:00.000Z'
        }),
    notes: faker.lorem.paragraph()
  };  
}  

export function createInvalidEMail(): Email {  
  return {  
    email: faker.random.word() + '@!@#$.com',
  };  
}  

export function createInvalidDate(): InvalidDate {  
  return {  
    dateOfApp: faker.date.past(),
  };  
}  

const ValidUser = createValidUser();

export default ValidUser;
 





 








