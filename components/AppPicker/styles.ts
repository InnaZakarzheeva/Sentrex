import { Dimensions, StyleSheet } from "react-native";

import { Colors, Component, Margins } from "../../../resources";

const BORDER_WIDTH = 2;
const WIDTH = Dimensions.get("screen").width - 2 * Margins.marginBiggest;

export const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    flexWrap: "wrap",
    flexDirection: "row",
    overflow: "hidden"
  }
});

export const buttonStyle = (isActive: boolean, columns: number): any => ({
  borderColor: isActive ? Colors.accentTurquoise : Colors.inputBorder,
  backgroundColor: isActive ? Colors.accentTurquoise : Colors.white,
  width: (WIDTH - BORDER_WIDTH) / columns,
  justifyContent: "center",
  alignItems: "center",
  height: Component.appButtonHeight,
  borderWidth: 1
});

export const buttonTitleStyle = (isActive: boolean) => ({
  color: isActive ? Colors.white : Colors.secondaryTextDark
});
