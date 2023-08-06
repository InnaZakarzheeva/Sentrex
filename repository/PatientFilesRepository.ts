import LocalStorage from "./local";
import {
  GetPatientPhotoPayload,
  ScheduleCallPayload
} from "../state/patientFiles";
import ApiManager from "./api/ApiManager";

const PATIENT_FILES = "/api/patient-files";
const SCHEDULE_CALL = "/api/call-schedule";

class PatientFilesRepository {
  private static instance: PatientFilesRepository;

  private constructor() {}

  public static getInstance(): PatientFilesRepository {
    if (!this.instance) {
      this.instance = new PatientFilesRepository();
    }

    return this.instance;
  }

  public static uploadFiles = (payload: FormData) => {
    return ApiManager.getInstance().createUploadFileChannel(
      PATIENT_FILES,
      payload
    );
  };

  public static scheduleCall = (payload: ScheduleCallPayload) => {
    return ApiManager.getInstance().post(SCHEDULE_CALL, payload);
  };

  public static getSkippedStepsFromLocalStorage = () => {
    return LocalStorage.get("skiped_steps");
  };

  public static saveSkippedStepsToLocalStorage = (skipedSteps: string) => {
    return LocalStorage.set("skiped_steps", skipedSteps);
  };

  public static getPatientFiles = (payload: GetPatientPhotoPayload) => {
    return ApiManager.getInstance().get(
      `${PATIENT_FILES}?PatientId=${payload.patientId}&PhotosType=${payload.photosType}&DrugBrandCode=${payload.drugBrandCode}`
    );
  };

  public static deletePatientFiles = (id: string) => {
    return ApiManager.getInstance().delete(`${PATIENT_FILES}?id=${id}`);
  };
}

export default PatientFilesRepository;
