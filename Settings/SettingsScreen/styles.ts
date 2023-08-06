import { StyleSheet } from "react-native";
import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle
  },
  picker: {
    marginTop: Margins.marginDefault
  },
  label: {
    marginTop: Margins.marginBig
  },
  input: {
    marginTop: Margins.marginDefault
  },
  passwordBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Margins.marginDefault
  },
  updateBtn: {
    marginHorizontal: Margins.marginBiggest
  }
});
