import { LoginPage } from "../pom/loginPage";
import {
  RecruitmentPage,
  User,
  UserRequire,
} from "../pom/recruitmentPage";
import account from "../data/account.json";
import { faker } from "@faker-js/faker";
import ValidUser from "../data/fakeData";

import { 
  waitForElementVisible, 
  elementShouldContainText, 
  elementValueShouldContain, 
  elementAttributeShouldContain,
  elementShouldEmpty,
  addDays,
  subtractDays
} from "./utils";

import { format } from 'date-fns'
import {
  createValidUser,
  createRequiredValidUser,
} from "../data/fakeData";
export {
  LoginPage,
  RecruitmentPage,
  account,
  ValidUser,
  createValidUser,
  faker, 
  format, 
  waitForElementVisible, 
  createRequiredValidUser,
  elementShouldContainText,
  elementValueShouldContain,
  elementAttributeShouldContain,
  User,
  UserRequire,
  elementShouldEmpty,
  addDays,
  subtractDays
};
