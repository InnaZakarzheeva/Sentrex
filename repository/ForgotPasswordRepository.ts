import ApiManager from "./api/ApiManager";

const REQUEST_CODE = "api/forgot-password/request";
const VALIDATE_CODE = "api/forgot-password/validate-verification-code";
const RESET_PASSWORD = "api/forgot-password/reset-password";

class ForgotPasswordRepository {
  private static instance: ForgotPasswordRepository;

  private constructor() {}

  public static getInstance(): ForgotPasswordRepository {
    if (!this.instance) {
      this.instance = new ForgotPasswordRepository();
    }
    return this.instance;
  }

  public static requestCode = (phoneNumber: string) => {
    return ApiManager.getInstance().get(REQUEST_CODE, {
      PhoneNumber: phoneNumber
    });
  };

  public static validateCode = (phoneNumber: string, code: string) => {
    return ApiManager.getInstance().post(VALIDATE_CODE, {
      phoneNumber,
      code
    });
  };

  public static resetPassword = (
    phoneNumber: string,
    code: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) => {
    return ApiManager.getInstance().post(RESET_PASSWORD, {
      phoneNumber,
      code,
      newPassword,
      newPasswordConfirmation
    });
  };
}

export default ForgotPasswordRepository;
