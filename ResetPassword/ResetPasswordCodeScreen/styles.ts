import { StyleSheet } from "react-native";

import { Component, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  label: {
    marginTop: Margins.marginSmall,
    marginBottom: Margins.marginMiddle
  },
  button: { marginHorizontal: Margins.marginBiggest },
  contentContainer: { marginHorizontal: Margins.marginBiggest, flex: 1 },
  resendBtn: {
    height: Component.imageButtonSize,
    marginBottom: Margins.marginMiddle,
    borderRadius: 4,
    marginTop: Margins.marginSmall
  }
});
