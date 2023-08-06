import { StyleSheet, Animated, Platform, ViewStyle } from "react-native";
import { Colors, Component, Margins } from "../../../resources";

const ROOT_CONTAINER_HEIGHT = 72;

export const styles = StyleSheet.create({
  container: { height: ROOT_CONTAINER_HEIGHT },
  datePickerContainer: {
    height: Component.inputHeight,
    backgroundColor: Colors.white,
    borderRadius: Component.inputBorderRadius,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    paddingLeft: Margins.marginDefault,
    alignItems: "center",
    flexDirection: "row"
  },
  labelWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  IOSPickerWrapper: {
    flex: 1,
    backgroundColor: Colors.black50,
    justifyContent: "flex-end"
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24
  },
  separator: {
    height: 1,
    backgroundColor: Colors.inputBorder
  },
  pickerHeader: {
    height: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: "center",
    flexDirection: "row"
  },
  headerLabel: {
    flex: 1,
    textAlign: "center"
  }
});

const buttonsContainer = (bottomInset: number): ViewStyle => ({
  backgroundColor: Colors.grayLight,
  flexDirection: "row",
  justifyContent: "space-around",
  paddingBottom: bottomInset
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

const valueLabel = (isEmptyValue: boolean) => ({
  color: isEmptyValue ? Colors.placeholder : Colors.neutralDark
});

export { buttonsContainer, labelAnimStyle, textInputAnimStyle, valueLabel };
