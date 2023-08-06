import { StyleSheet } from "react-native";

import { Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  label: {
    marginTop: Margins.marginSmall,
    marginBottom: Margins.marginMiddle
  },
  button: { marginHorizontal: Margins.marginBiggest },
  contentContainer: { marginHorizontal: Margins.marginBiggest, flex: 1 },
  topInput: { marginBottom: Margins.marginSmall }
});
