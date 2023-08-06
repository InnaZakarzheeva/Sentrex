import {
  AddMemberPayload,
  ChangePasswordPayload,
  ChangePhonePayload,
  SignInPayload,
  SignUpPayload
} from "../state";
import ApiManager from "./api/ApiManager";
import LocalStorage from "./local";

const SIGN_IN = "api/auth/sign-in";
const SIGN_OUT = "api/auth/sign-out";
const GET_STARTED = "/api/registration/get-started";
const REQUEST_VERIFICATION_CODE = "api/registration/request-verification-code";
const VALIDATE_VERIFICATION_CODE =
  "/api/registration/validate-verification-code";
const SUMMARY = "/api/registration/summary";
const CHANGE_PHONE_REQUEST = "/api/auth/change-phone-request";
const CHANGE_PHONE = "/api/auth/change-phone";
const CHANGE_PASSWORD_REQUEST = "/api/auth/change-password-request";
const CHANGE_PASSWORD = "/api/auth/change-password";
const PATIENT_INFO = "/api/patient";

class AuthRepository {
  private static instance: AuthRepository;

  private constructor() {}

  public static getInstance(): AuthRepository {
    if (!this.instance) {
      this.instance = new AuthRepository();
    }

    return this.instance;
  }

  public static signIn = (phoneNumber: string, password: string) => {
    return ApiManager.getInstance().post(
      SIGN_IN,
      {
        password,
        phoneNumber
      },
      {
        "Device-Reg-Token": "DeviceToken"
      }
    );
  };

  public static signOut = () => {
    return ApiManager.getInstance().post(SIGN_OUT, null, {
      "Device-Reg-Token": "DeviceToken"
    });
  };

  public static getTokenFromLocalStorage = () => {
    return LocalStorage.get("auth_token");
  };

  public static saveTokenToLocalStorage = (token: string) => {
    return LocalStorage.set("auth_token", token);
  };

  public static isRegisteredUser = (phoneNumber: string) => {
    return ApiManager.getInstance().post(GET_STARTED, {
      phoneNumber
    });
  };

  public static sendVerificationCode = (phoneNumber: string) => {
    return ApiManager.getInstance().get(REQUEST_VERIFICATION_CODE, {
      phoneNumber
    });
  };

  public static validateVerificationCode = (
    code: string,
    phoneNumber: string
  ) => {
    return ApiManager.getInstance().post(VALIDATE_VERIFICATION_CODE, {
      code,
      phoneNumber
    });
  };

  public static signUp = (payload: SignUpPayload) => {
    return ApiManager.getInstance().post(SUMMARY, payload, {
      "Device-Reg-Token": "DeviceToken"
    });
  };

  public static changePhoneRequest = (payload: SignInPayload) => {
    return ApiManager.getInstance().post(CHANGE_PHONE_REQUEST, payload);
  };

  public static changePhoneNumber = (payload: ChangePhonePayload) => {
    return ApiManager.getInstance().post(CHANGE_PHONE, payload);
  };

  public static validatePassword = (password: string) => {
    return ApiManager.getInstance().post(CHANGE_PASSWORD_REQUEST, {
      password
    });
  };

  public static changePassword = (payload: ChangePasswordPayload) => {
    return ApiManager.getInstance().post(CHANGE_PASSWORD, payload);
  };

  public static addMember = (payload: AddMemberPayload) => {
    return ApiManager.getInstance().post(PATIENT_INFO, payload);
  };
}

export default AuthRepository;
