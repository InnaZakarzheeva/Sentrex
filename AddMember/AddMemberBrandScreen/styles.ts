import { StyleSheet } from "react-native";
import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contenWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle
  },
  continueBtn: { marginHorizontal: Margins.marginBiggest },
  separator: { height: Margins.marginSmall },
  flatList: { marginBottom: Margins.marginDefault },
  searchContainer: {
    paddingTop: Margins.marginSmall,
    paddingBottom: Margins.marginMiddle,
    paddingHorizontal: Margins.marginBig
  }
});
