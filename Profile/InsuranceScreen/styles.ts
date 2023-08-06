import { StyleSheet } from "react-native";

import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contenWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle
  },
  insuranceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Margins.marginMiddle
  },
  updateBtn: {
    marginHorizontal: Margins.marginBiggest
  },
  addInsuranceBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 0
  },
  addInsuranceBtnTitle: {
    color: Colors.accentBlue,
    marginLeft: Margins.marginSmall
  },
  insuranceLabel: {
    marginBottom: Margins.marginMiddle,
    marginTop: Margins.marginSmall
  },
  uploaderWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10
  }
});
