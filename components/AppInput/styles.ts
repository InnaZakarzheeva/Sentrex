import { Animated, Platform, StyleSheet, ViewStyle } from "react-native";
import _ from "lodash";
import { Colors, Component, Margins } from "../../../resources";

const ROOT_CONTAINER_HEIGHT = 72;
const INPUT_HEIGHT = 36;

const styles = StyleSheet.create({
  container: { height: ROOT_CONTAINER_HEIGHT },
  textInput: {
    color: Colors.primaryTextDark,
    fontSize: 18,
    height: INPUT_HEIGHT,
    paddingHorizontal: 0,
    paddingVertical: 0,
    padding: 0
  },
  errorLabel: {
    color: "red",
    marginTop: Margins.marginMicro
  }
});

const labelAnimStyle = (value: Animated.Value | number): any => ({
  position: "absolute",
  left: Margins.marginDefault,
  top: 2,
  fontWeight: Platform.select({ ios: "600" }),
  fontSize: 12,
  opacity: value,
  color: Colors.secondaryTextDark
});

const errorContainerStyle = (value: Animated.Value | number) => ({
  opacity: value,
  color: "red",
  fontSize: 12
});

const textInputContainerStyle = (
  focused: boolean,
  errorLabel: string | null | undefined
): ViewStyle => ({
  height: Component.inputHeight,
  backgroundColor: Colors.white,
  borderRadius: Component.inputBorderRadius,
  borderWidth: 2,
  borderColor:
    focused && !_.isNil(errorLabel)
      ? Colors.accentRed
      : focused
      ? Colors.accentBlue
      : Colors.inputBorder,
  paddingLeft: Margins.marginDefault,
  alignItems: "center",
  flexDirection: "row"
});

const textInputAnimStyle = (translateY: Animated.Value): any => ({
  marginRight: Margins.marginDefault,
  flex: 1,
  transform: [
    {
      translateY: translateY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 6]
      })
    }
  ]
});

export {
  styles,
  labelAnimStyle,
  errorContainerStyle,
  textInputContainerStyle,
  textInputAnimStyle
};
