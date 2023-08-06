import {
  PatientPayload,
  PatientPersonalInfoPayload,
  RegistrationInfoPayload
} from "./types";

export const mapPatients = (respose: any): Array<PatientPayload> =>
  respose.value.patients;

export const mapAccountInfo = (response: any): RegistrationInfoPayload => {
  return {
    user: {
      patientId: response.value.patientId,
      drugBrandCode: response.value.currentDrugBrandCode
    },
    drugBrandsCodes: response.value.drugBrandsCodes
  };
};

export const mapEmail = (response: any): string => response.value.email;

export const mapPatientPersonalInfo = (
  response: any
): PatientPersonalInfoPayload => {
  return response.value as PatientPersonalInfoPayload;
};
