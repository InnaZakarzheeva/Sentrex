import _ from "lodash";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import AuthSlice from "./auth/Slice";
import BrandsSlice from "./brands/Slice";
import NavigationSlice from "./navigation/Slice";
import ProvincesSice from "./province/Slice";
import ForgotPasswordSlice from "./forgotPassword/Slice";
import PatientFilesSlice from "./patientFiles/Slice";
import PatientAddress from "./patientAddress/Slice";
import AccountSlice from "./account/Slice";

import rootSaga from "./rootSaga";

const rootReducer = combineReducers({
  auth: AuthSlice.reducer,
  forgotPassword: ForgotPasswordSlice.reducer,
  navigation: NavigationSlice.reducer,
  brands: BrandsSlice.reducer,
  provinces: ProvincesSice.reducer,
  patientFiles: PatientFilesSlice.reducer,
  patientAddress: PatientAddress.reducer,
  account: AccountSlice.reducer
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: false
});

sagaMiddleware.run(rootSaga);

export default store;
export type ReduxStore = ReturnType<typeof rootReducer>;
