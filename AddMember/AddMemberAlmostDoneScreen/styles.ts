import { StyleSheet } from "react-native";
import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contenWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle
  },
  label: {
    marginTop: Margins.marginSmall,
    marginBottom: Margins.marginMiddle
  },
  pickerWrapper: {
    marginTop: Margins.marginDefault,
    marginBottom: Margins.marginMiddle
  },
  continueBtn: { marginHorizontal: Margins.marginBiggest }
});
