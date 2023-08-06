import { StyleSheet } from "react-native";

import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contenWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  updateBtn: {
    marginHorizontal: Margins.marginBiggest
  }
});
