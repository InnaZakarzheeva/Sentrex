import { PatientPersonalInfoPayload, UserInfoPayload } from "../state";
import ApiManager from "./api/ApiManager";

const HOME = "/api/home";
const REGISTRATION_INFO = "/api/patient/registration-info";
const SETTINGS_INFO = "/api/account/settings";
const PATIENT_INFO = "/api/patient";

class AccountRepository {
  private static instance: AccountRepository;

  private constructor() {}

  public static getInstance(): AccountRepository {
    if (!this.instance) {
      this.instance = new AccountRepository();
    }

    return this.instance;
  }

  public static getHome = () => {
    return ApiManager.getInstance().get(HOME, null, {
      "Device-Reg-Token": "DeviceToken"
    });
  };

  public static getRegistrationInfo = (payload: UserInfoPayload) => {
    return ApiManager.getInstance().get(
      `${REGISTRATION_INFO}?PatientId=${payload.patientId}&DrugBrandCode=${payload.drugBrandCode}`
    );
  };

  public static getSettingsInfo = () => {
    return ApiManager.getInstance().get(SETTINGS_INFO);
  };

  public static getPatientInfo = (patientId: string) => {
    return ApiManager.getInstance().get(
      `${PATIENT_INFO}?PatientId=${patientId}`
    );
  };

  public static updatePatientInfo = (
    patient: PatientPersonalInfoPayload,
    patientId: string
  ) => {
    return ApiManager.getInstance().put(PATIENT_INFO, {
      ...patient,
      patientId
    });
  };
}

export default AccountRepository;
