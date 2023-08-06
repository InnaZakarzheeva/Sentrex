import { RequestErrorView, RequestStatus } from "../types";

export interface PatientFilesState {
  requestStatus: RequestStatus;
  requestError: RequestErrorView | null;
  requestScheduleCallStatus: RequestStatus;
  requestScheduleCallError: RequestErrorView | null;
  requestGetFilesStatus: RequestStatus;
  requestGetFilesError: RequestErrorView | null;
  requestDeleteFilesStatus: RequestStatus;
  requestDeleteFilesError: RequestErrorView | null;
  requestUpdateFilesStatus: RequestStatus;
  requestUpdateFilesError: RequestErrorView | null;
}

export interface PatientFilesPayload {
  files: Array<FilesPayload>;
  isMember?: boolean;
}

export interface FilesPayload {
  id?: string;
  name: string;
  uri: string;
  type?: string;
  description?: ImageType;
  filesType: FilesType;
}

export interface GetFilesPayload {
  id: string;
  base64Content: string;
  description: ImageType;
}

export interface GetPatientFilesPayload {
  files: Array<GetFilesPayload>;
  filesType: FilesType;
}

export interface FileView {
  id: string;
  metadata: FilesPayload | string;
  filesType: FilesType;
}

export type FilesType =
  | "Prescription"
  | "Dispense"
  | "PrimaryInsurance"
  | "SecondaryInsurance"
  | "HealthCard";

export type ImageType = "FRONT" | "BACK" | "SECONDARY_FRONT" | "SECONDARY_BACK";

export interface ScheduleCallPayload {
  today: boolean;
  time: string;
  drugBrandCode?: string;
}

export interface GetPatientPhotoPayload {
  patientId: string;
  photosType: FilesType;
  drugBrandCode: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface UpdateFilesPayload {
  deleted: Array<string>;
  added: PatientFilesPayload;
  fileType: FilesType;
  additionalFileType?: FilesType;
}

export interface ModalPayload {
  image: string;
  index: number;
}
