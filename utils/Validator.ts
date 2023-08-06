import _ from "lodash";
import { useEffect, useState } from "react";
import { AppString } from "../resources";

type Validation =
  | "phone_number"
  | "password"
  | "email"
  | "first_name"
  | "last_name";

const PHONE_NUMBER_REGEX = /^[+]{1}[0-9]{11,12}$/;
const PASSWORD_NUMBER_REGEX = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&amp;*\-_+=[\]{}|\\:',?/`~&quot;();!]|\.(?!@)){8,16}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^.{0,35}$/;

const isTextValid = (email: string, reg: RegExp): boolean => {
  if (email.length === 0) {
    return false;
  }
  return reg.test(email) === true;
};

const useError = (value: string | null | undefined, validation: Validation) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_.isNil(value)) {
      return;
    }
    let valid = false;
    let errorMessage = "";

    switch (validation) {
      case "phone_number":
        valid = isTextValid(value, PHONE_NUMBER_REGEX);
        errorMessage = AppString.get().errorIncorrectPhoneNumber;
        break;
      case "password":
        valid = isTextValid(value, PASSWORD_NUMBER_REGEX);
        errorMessage = AppString.get().errorIncorrectPassword;
        break;
      case "email":
        valid = isTextValid(value, EMAIL_REGEX);
        errorMessage = AppString.get().errorIncorrectEmail;
        break;
      case "first_name":
        valid = NAME_REGEX.test(value) === true;
        errorMessage = AppString.get().errorIncorrectFirstName;
        break;
      case "last_name":
        valid = NAME_REGEX.test(value) === true;
        errorMessage = AppString.get().errorIncorrectLastName;
        break;
    }

    if (valid) {
      setError(null);
    } else if (!valid && _.isNil(error)) {
      setError(errorMessage);
    }
  }, [value]);

  return error;
};

export { useError };
