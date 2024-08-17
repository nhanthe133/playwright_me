import { LoginPage } from "../pom/loginPage";
import {
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  fullCandidateName,
  getHiringName,
  halfNameCombiner,
  halfCandidateName,
  User,
} from "../pom/recruitmentPage";
import account from "../data/account.json";
import { faker } from "@faker-js/faker";
import ValidUser from "../data/fakeData";
import { waitForElementVisible } from "../helpers/utils";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import {
  createValidUser,
  createRequiredValidUser,
  // createInvalidEMail,
  // createInvalidDate,
} from "../data/fakeData";
export {
  LoginPage,
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  fullCandidateName,
  halfNameCombiner,
  halfCandidateName,
  account,
  ValidUser,
  createValidUser,
  faker, 
  format, 
  getHiringName,
  waitForElementVisible, 
  createRequiredValidUser
  // createInvalidEMail,
  // createInvalidDate,
};
