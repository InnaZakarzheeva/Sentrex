import { StyleSheet, Animated, Platform } from "react-native";
import { Colors, Component, Margins } from "../../../resources";

const ROOT_CONTAINER_HEIGHT = 72;

export const styles = StyleSheet.create({
  container: { height: ROOT_CONTAINER_HEIGHT },
  textInputContainerStyle: {
    height: Component.inputHeight,
    backgroundColor: Colors.white,
    borderRadius: Component.inputBorderRadius,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    paddingLeft: Margins.marginDefault,
    alignItems: "center",
    flexDirection: "row"
  },
  inputContainer: {
    height: Component.inputHeight,
    backgroundColor: Colors.white,
    borderRadius: Component.inputBorderRadius,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    paddingLeft: Margins.marginDefault,
    alignItems: "center",
    flexDirection: "row"
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const labelAnimStyle = (value: Animated.Value): any => ({
  position: "absolute",
  left: Margins.marginDefault,
  top: 2,
  fontWeight: Platform.select({ ios: "600" }),
  fontSize: 12,
  opacity: value,
  color: Colors.secondaryTextDark
});

const textInputAnimStyle = (translateY: Animated.Value) => ({
  marginRight: Margins.marginSmall,
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

const textValue = (isEmpty: boolean) => ({
  color: isEmpty ? Colors.placeholder : Colors.neutralDark
});

export { labelAnimStyle, textInputAnimStyle, textValue };
