import { PatientInfoPayload, SignUpResponse } from "./types";

export const mapToken = (response: any): string => {
  return response.value.token as string;
};

export const mapSignInResponse = (response: any): PatientInfoPayload => {
  return response.value.selectedPatientInfo as PatientInfoPayload;
};

export const mapSignUpResponse = (response: any): SignUpResponse => {
  return response.value as SignUpResponse;
};

export const mapMemberId = (response: any): string => response.value as string;
