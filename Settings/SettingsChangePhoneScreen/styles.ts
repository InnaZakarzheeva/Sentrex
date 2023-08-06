import { StyleSheet } from "react-native";
import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle
  },
  text: { marginBottom: Margins.marginMiddle },
  continueBtn: { marginHorizontal: Margins.marginBiggest }
});
