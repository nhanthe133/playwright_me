import { test, expect, type Page } from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import {
  RecruitmentPage,
  addRecord,
  deleteRecord,
  fullNameCombiner,
  fullCandidateName,
  halfNameCombiner,
  halfCandidateName,
} from "../pom/recruitmentPage";
import account from "../data/account.json";
import ValidUser from "../data/fakeData";
import {
  createValidUser,
  createInvalidEMail,
  createInvalidDate,
} from "../data/fakeData";
export {
  test,
  expect,
  Page,
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
  createInvalidEMail,
  createInvalidDate,
};
