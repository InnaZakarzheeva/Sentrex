import { StyleSheet, ViewStyle } from "react-native";

import { Colors, Component, Margins } from "../../../resources";

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: Margins.marginDefault,
    justifyContent: "space-between"
  },
  textInput: {
    flex: 1,
    color: Colors.primaryTextDark,
    fontSize: 18,
    height: 28,
    paddingLeft: Margins.marginSmall,
    paddingVertical: 0,
    padding: 0
  },
  errorLabel: {
    color: "red",
    marginTop: Margins.marginMicro
  }
});

const textInputContainerStyle = (focused: boolean): ViewStyle => ({
  height: Component.searchInputHeight,
  backgroundColor: Colors.white,
  borderRadius: Component.inputBorderRadius,
  borderWidth: 2,
  borderColor: focused ? Colors.accentBlue : Colors.inputBorder,
  paddingLeft: Margins.marginSmall,
  alignItems: "center",
  flexDirection: "row"
});

export { styles, textInputContainerStyle };
