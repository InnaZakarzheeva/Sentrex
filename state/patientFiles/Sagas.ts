import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { put, call, take, select, all } from "redux-saga/effects";
import {
  FilesPayload,
  FilesType,
  PatientFilesPayload,
  ScheduleCallPayload,
  UpdateFilesPayload
} from "./types";

import { PatientFilesRepository } from "../../repository";
import { handleApiError } from "../utils";
import patientFilesSlice, { SLICE_NAME } from "./Slice";
import { getMemberInfoSelector, userInfoSelector } from "../account";
import { mapFilesPayload } from "./Mapper";

export const sendPatientFilesAsyncAction = createAction<PatientFilesPayload>(
  `${SLICE_NAME}/sendPatientFilesAsyncAction`
);

export function* sendPatientFilesSaga(
  action: PayloadAction<PatientFilesPayload>
) {
  const {
    startRequestAddFilesAction,
    successRequestAddFilesAction,
    showRequestErrorAction
  } = patientFilesSlice.actions;

  const { drugBrandCode, patientId } = action.payload.isMember
    ? yield select(getMemberInfoSelector)
    : yield select(userInfoSelector);

  try {
    yield put(startRequestAddFilesAction());

    for (let i = 0; i < action.payload.files.length; i++) {
      yield handleUploadFile(action.payload.files[i], drugBrandCode, patientId);
    }

    yield put(successRequestAddFilesAction());
  } catch (error) {
    yield put(
      showRequestErrorAction({
        code: 400,
        message: "Upload failed"
      })
    );
  }
}

function* handleUploadFile(
  files: FilesPayload,
  drugBrandCode: string,
  patientId: string
) {
  let formData = new FormData();
  formData.append("Files", {
    name: files.name,
    uri: files.uri,
    type: files.type
  });
  formData.append("FilesType", files.filesType);
  formData.append("PatientId", patientId);
  formData.append("DrugBrandCode", drugBrandCode);
  if (files.description) {
    formData.append(`FileNameDescription[${files.name}]`, files.description);
  }

  let channel = yield call(PatientFilesRepository.uploadFiles, formData);

  while (true) {
    let { err } = yield take(channel);
    if (err) {
      throw new Error();
    }
  }
}

export const scheduleCallAsyncAction = createAction<ScheduleCallPayload>(
  `${SLICE_NAME}/scheduleCallAsyncAction`
);

export function* scheduleCallSaga(action: PayloadAction<ScheduleCallPayload>) {
  const {
    startRequestScheduleCallAction,
    successRequestScheduleCallAction,
    showRequestScheduleCallErrorAction
  } = patientFilesSlice.actions;
  const { drugBrandCode } = yield select(userInfoSelector);

  try {
    yield put(startRequestScheduleCallAction());

    yield call(PatientFilesRepository.scheduleCall, {
      today: action.payload.today,
      time: action.payload.time,
      drugBrandCode
    });
    yield put(successRequestScheduleCallAction());
  } catch (error) {
    yield handleApiError(error, showRequestScheduleCallErrorAction);
  }
}

export const getPatientFilesAsyncAction = createAction<string>(
  `${SLICE_NAME}/getPatientFilesAsyncAction`
);

export function* getPatientFilesSaga(action: PayloadAction<FilesType>) {
  const {
    startRequestGetFilesAction,
    successRequestGetFilesAction,
    showRequestGetFilesErrorAction
  } = patientFilesSlice.actions;

  const { drugBrandCode, patientId } = yield select(userInfoSelector);

  try {
    yield put(startRequestGetFilesAction());

    const result = yield call(PatientFilesRepository.getPatientFiles, {
      patientId,
      photosType: action.payload,
      drugBrandCode
    });

    const files = yield mapFilesPayload(result.data);

    yield put(
      successRequestGetFilesAction({
        files,
        filesType: action.payload
      })
    );
  } catch (error) {
    yield handleApiError(error, showRequestGetFilesErrorAction);
  }
}

export function* deletePatientFilesSaga(payload: Array<string>) {
  const {
    startRequestDeleteFilesAction,
    successRequestDeleteFilesAction,
    showRequestDeleteFilesErrorAction
  } = patientFilesSlice.actions;

  try {
    yield put(startRequestDeleteFilesAction());

    const data = [];

    for (let i = 0; i < payload.length; i++) {
      data.push(call(PatientFilesRepository.deletePatientFiles, payload[i]));
    }

    yield all(data);

    yield put(successRequestDeleteFilesAction(payload));
  } catch (error) {
    yield handleApiError(error, showRequestDeleteFilesErrorAction);
  }
}

export const updatePatientFilesAsyncAction = createAction<UpdateFilesPayload>(
  `${SLICE_NAME}/updatePatientFilesAsyncAction`
);

export function* updatePatientFilesSaga(
  action: PayloadAction<UpdateFilesPayload>
) {
  const {
    startRequestUpdateFilesAction,
    successRequestUpdateFilesAction,
    showRequestUpdateFilesErrorAction
  } = patientFilesSlice.actions;
  try {
    yield put(startRequestUpdateFilesAction());

    yield deletePatientFilesSaga(action.payload.deleted);
    yield sendPatientFilesSaga({
      payload: action.payload.added,
      type: `${SLICE_NAME}/sendPatientFilesAsyncAction`
    });
    yield getPatientFilesSaga({
      payload: action.payload.fileType,
      type: `${SLICE_NAME}/getPatientFilesAsyncAction`
    });
    if (action.payload.additionalFileType) {
      yield getPatientFilesSaga({
        payload: action.payload.additionalFileType,
        type: `${SLICE_NAME}/getPatientFilesAsyncAction`
      });
    }

    yield put(successRequestUpdateFilesAction());
  } catch (error) {
    yield handleApiError(error, showRequestUpdateFilesErrorAction);
  }
}
