import { StyleSheet } from "react-native";

import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contenWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle
  },
  pickerWrapper: {
    marginVertical: Margins.marginDefault
  },
  updateBtn: {
    marginHorizontal: Margins.marginBiggest
  }
});
