import * as Localize from "react-native-localize";

import en from "./en";
import fr from "./fr";

const EN = "en";
const FR = "fr";
const SUPPORTED_LANGUAGES = [EN, FR];

class AppString {
  private static instance: AppString;
  private preferdLanguageCode: string = SUPPORTED_LANGUAGES[0];

  private constructor() {
    const locales = Localize.getLocales();
    if (locales.length > 0) {
      if (SUPPORTED_LANGUAGES.includes(locales[0].languageCode)) {
        this.preferdLanguageCode = locales[0].languageCode;
      }
    }
  }

  public static get() {
    if (!AppString.instance) {
      AppString.instance = new AppString();
    }

    if (AppString.instance.preferdLanguageCode === EN) {
      return en;
    } else if (AppString.instance.preferdLanguageCode === FR) {
      return fr;
    }
    return en;
  }
}

export default AppString;
