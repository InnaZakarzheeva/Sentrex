import { Gender } from "../auth";
import { RequestErrorView, RequestStatus } from "../types";

export interface AccountState {
  user: UserInfoPayload;
  patient: PatientPersonalInfoPayload;
  requestHomeStatus: RequestStatus;
  requestHomeError: RequestErrorView | null;
  patients: Array<PatientPayload>;
  member: MemberInfoPayload;
  drugBrandsCodes: Array<string>;
  requestRegistrationInfoStatus: RequestStatus;
  requestRegistrationInfoError: RequestErrorView | null;
  requestSettingsInfoStatus: RequestStatus;
  requestSettingsInfoError: RequestErrorView | null;
  requestPatientInfoStatus: RequestStatus;
  requestPatientInfoError: RequestErrorView | null;
  requestUpdatePatientInfoStatus: RequestStatus;
  requestUpdatePatientInfoError: RequestErrorView | null;
}

export interface PatientPayload {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserInfoPayload {
  drugBrandCode: string;
  patientId: string | undefined;
  phoneNumber?: string;
  email?: string;
}

export interface RegistrationInfoPayload {
  user: UserInfoPayload;
  drugBrandsCodes: Array<string>;
}

export interface AccountModalPayload {
  id: string;
  value: string;
}

export interface PatientPersonalInfoPayload {
  firstName: string;
  lastName: string;
  gender: Gender | undefined;
  birthDate: string;
  prescriberName: string;
}

export interface MemberInfoPayload {
  patientId: string;
  drugBrandCode: string;
}
