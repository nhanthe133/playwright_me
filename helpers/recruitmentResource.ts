import { LoginPage } from "../pom/loginPage";
import {
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  fullCandidateName,
  getHiringName,
  halfNameCombiner,
  searchRecord,
  halfCandidateName,
  fillTheFields,
  User,
  UserRequire
} from "../pom/recruitmentPage";
import account from "../data/account.json";
import { faker } from "@faker-js/faker";
import ValidUser from "../data/fakeData";

import { 
  waitForElementVisible, 
  elementShouldContainText, 
  elementValueShouldContain, 
  elementAttributeShouldContain,
  elementShouldEmpty
} from "./utils";

import { format } from 'date-fns'
import {
  createValidUser,
  createRequiredValidUser,
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
  searchRecord,
  ValidUser,
  createValidUser,
  faker, 
  format, 
  getHiringName,
  waitForElementVisible, 
  createRequiredValidUser,
  elementShouldContainText,
  elementValueShouldContain,
  elementAttributeShouldContain,
  fillTheFields,
  User,
  UserRequire,
  elementShouldEmpty
};
