import { StyleSheet } from "react-native";

import { Component, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  scrollView: { marginVertical: Margins.marginDefault },
  scrollviewContent: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    paddingVertical: Margins.marginSmall
  },
  addressTypeLabel: { marginBottom: Margins.marginMicro },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Margins.marginSmall
  },
  checkBox: {
    width: Component.checkboxSize,
    height: Component.checkboxSize,
    marginRight: Margins.marginSmall
  },
  button: { flex: 1 },
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: Margins.marginBiggest
  },
  buttonsSpace: { width: Margins.marginDefault }
});
