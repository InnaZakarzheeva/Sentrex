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
  continueBtn: { marginHorizontal: Margins.marginBiggest },
  tipsWrapper: {
    flexDirection: "row",
    height: 40,
    borderRadius: 4,
    backgroundColor: Colors.lightBlue,
    alignItems: "center",
    paddingHorizontal: Margins.marginDefault,
    marginTop: Margins.marginDefault,
    marginBottom: Margins.marginMiddle
  },
  phoneLabel: { marginLeft: Margins.marginDefault },
  modalBtnWrapper: {
    borderTopWidth: 1,
    borderColor: Colors.inputBorder
  }
});
