import { LoginPage } from "../pom/loginPage";
import {
  RecruitmentPage,
  User,
  UserRequire,
} from "../pom/recruitmentPage";
import account from "../data/account.json";
import { faker } from "@faker-js/faker";
import ValidUser from "../data/fakeData";
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
  createRequiredValidUser,
  User,
  UserRequire
};
