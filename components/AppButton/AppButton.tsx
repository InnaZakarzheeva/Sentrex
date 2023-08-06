import { useLayout } from "@react-native-community/hooks";
import React from "react";
import {
  ViewStyle,
  TextStyle,
  ColorValue,
  Pressable,
  PressableStateCallbackType,
  Platform,
  StyleProp,
  PressableAndroidRippleConfig
} from "react-native";

import {
  Colors,
  Component,
  IOS_ACTIVE_OPACITY,
  Margins
} from "../../../resources";
import AppText, { FontType } from "../AppText";

interface Props {
  title: string;
  styleMode?: "contained" | "outlined" | "text";
  fontType?: FontType;
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: Element;
}

const AppButton = (props: Props) => {
  const { onLayout, ...layout } = useLayout();

  let backgroundColor: Colors | "transparent";
  let borderColor: ColorValue;
  let height: number = props.height || Component.appButtonHeight;
  let borderWidth = 0;
  let titleColor = Colors.white;
  let rippleColor: ColorValue = Colors.colorWhite15;

  switch (props.styleMode) {
    case "contained":
      backgroundColor = props.disabled
        ? Colors.buttonDisabled
        : Colors.accentBlue;
      borderColor = "transparent";
      break;
    case "outlined":
      backgroundColor = "transparent";
      borderColor = props.disabled ? Colors.buttonDisabled : Colors.accentBlue;
      titleColor = props.disabled ? Colors.buttonDisabled : Colors.accentBlue;
      borderWidth = 1;
      rippleColor = Colors.accentBlue;
      break;
    case "text":
      backgroundColor = "transparent";
      borderColor = "transparent";
      titleColor = props.disabled
        ? Colors.buttonDisabled
        : Colors.accentBlueLight;
      borderWidth = 0;
      height = Component.textButtonHeight;
      rippleColor = Colors.turquoiseLight;
      break;
    default:
      backgroundColor = props.disabled
        ? Colors.buttonDisabled
        : Colors.accentBlue;
      borderColor = "transparent";
  }

  const pressableStyle = (state: PressableStateCallbackType): any => {
    return [
      {
        opacity:
          state.pressed && Platform.OS === "ios" ? IOS_ACTIVE_OPACITY : 1,
        height,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius: Component.appButtonBorderRadius,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Margins.marginSmall
      },
      props.style
    ];
  };

  const titleStyle = (): any => [
    {
      color: titleColor
    },
    props.titleStyle
  ];

  const ripple = (
    width: number,
    color?: ColorValue
  ): PressableAndroidRippleConfig => ({
    color: color || Colors.white,
    radius: width / 2
  });

  return (
    <Pressable
      onLayout={onLayout}
      onPress={props.onPress}
      disabled={props.disabled}
      style={pressableStyle}
      android_ripple={ripple(layout.width, rippleColor)}>
      {props.icon}
      <AppText
        fontType={props.fontType || "subheading_1"}
        style={titleStyle()}
        ellipsizeMode="tail"
        numberOfLines={1}
        allowFontScaling={false}>
        {props.title}
      </AppText>
    </Pressable>
  );
};

export default AppButton;
