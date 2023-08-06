import { ReduxStore } from "..";
import { brandsSelectors } from "../brands/Slice";
import {
  MemberInfoPayload,
  AccountModalPayload,
  PatientPayload,
  UserInfoPayload
} from "./types";

export const getBrandByIdSelector = (state: ReduxStore) =>
  brandsSelectors.selectById(state.brands, state.account.user.drugBrandCode);

export const userInfoSelector = (state: ReduxStore): UserInfoPayload => {
  return state.account.user;
};

export const userNameSelector = (state: ReduxStore) => {
  const id = state.account.user.patientId;
  const patient = state.account.patients.find((p) => p.id === id);
  return patient ? patient.firstName : "";
};

export const getCurrentUserSelector = (
  state: ReduxStore
): PatientPayload | undefined =>
  state.account.patients.find(
    (item) => item.id === state.account.user.patientId
  );

export const getUsersDataSelector = (
  state: ReduxStore
): Array<AccountModalPayload> => {
  return state.account.patients.map((item) => {
    return {
      id: item.id,
      value: item.firstName + " " + item.lastName
    };
  });
};

export const getBrandsDataSelector = (
  state: ReduxStore
): Array<AccountModalPayload> => {
  return state.account.drugBrandsCodes.map((item) => {
    return {
      id: item,
      value: item
    };
  });
};

export const getMemberInfoSelector = (state: ReduxStore): MemberInfoPayload => {
  return state.account.member;
};
