import { StyleSheet } from "react-native";
import { Colors, Component, Margins } from "../../../resources";
import { EdgeInsets } from "react-native-safe-area-context";

export const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: Colors.black50,
    justifyContent: "center"
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: Margins.marginBig,
    borderRadius: Margins.marginDefault,
    paddingTop: Margins.marginMiddle,
    overflow: "hidden"
  },
  message: {
    marginHorizontal: Margins.marginDefault,
    marginBottom: Margins.marginMiddle
  },
  button: { color: Colors.secondaryTextDark },
  title: {
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: Margins.marginMiddle,
    marginBottom: Margins.marginSmall
  },
  btnsWrapper: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.grayLight,
    paddingBottom: Margins.marginSmall,
    height: Component.textButtonHeight + Margins.marginSmall
  },
  cancelBtnTitle: { color: Colors.secondaryTextDark },
  buttonTitle: { color: Colors.accentBlue },
  cancelBtn: {
    borderRightWidth: 1,
    borderColor: Colors.inputBorder
  },
  phoneWrapper: {
    flexDirection: "row",
    paddingHorizontal: Margins.marginDefault,
    marginBottom: Margins.marginBig
  },
  phoneLabel: {
    marginLeft: Margins.marginDefault
  },
  listItem: {
    marginTop: Margins.marginMiddle
  },
  flatList: { minHeight: 150, paddingBottom: Margins.marginSmall }
});

export const cancelBtn = (insents: EdgeInsets) => ({
  marginBottom: insents.bottom
});

export const cancelBtnWrapper = (insents: EdgeInsets) => ({
  backgroundColor: Colors.grayLight,
  height: 48 + insents.bottom,
  borderTopWidth: 1,
  borderColor: Colors.inputBorder,
  marginTop: Margins.marginMiddle
});
