import { StyleSheet } from "react-native";

import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Margins.marginMiddle,
    paddingHorizontal: Margins.marginBig
  },
  scrollView: {
    marginTop: Margins.marginMiddle,
    marginBottom: Margins.marginDefault
  },
  addButton: { flexDirection: "row", alignItems: "center" },
  addButtonText: { color: Colors.accentBlue },
  button: { marginHorizontal: Margins.marginBiggest }
});
