import React, { PropsWithChildren } from "react";
import {
  View,
  Pressable,
  PressableStateCallbackType,
  ViewStyle,
  Platform,
  ColorValue,
  PressableAndroidRippleConfig,
  StyleProp
} from "react-native";
import { useLayout } from "@react-native-community/hooks";
import _ from "lodash";

import { Colors, Margins } from "../../../resources";

interface Props {
  onPress?: () => void;
  disabled?: boolean;
  backgroundColor?: ColorValue;
  rippleColor?: ColorValue;
  height?: number;
  width?: number;
  borderRadius?: number;
  innerStyle?: StyleProp<ViewStyle>;
  outerStyle?: StyleProp<ViewStyle>;
}

const IOS_ACTIVE_OPACITY = 0.8;

const AppPressable = (props: PropsWithChildren<Props>) => {
  const { onLayout, ...layout } = useLayout();

  const pressableStyle = (state: PressableStateCallbackType): ViewStyle => {
    return [
      {
        opacity:
          state.pressed && Platform.OS === "ios" ? IOS_ACTIVE_OPACITY : 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: Margins.marginDefault,
        backgroundColor: props.backgroundColor || "transparent",
        borderRadius: props.borderRadius || 0,
        height: props.height,
        width: props.width
      },
      props.innerStyle
    ] as ViewStyle;
  };

  const outerContainerStyle = (): ViewStyle =>
    [
      {
        overflow: "hidden",
        borderRadius: props.borderRadius || 0,
        height: props.height,
        width: props.width
      },
      props.outerStyle
    ] as ViewStyle;

  const ripple = (
    width: number,
    color?: ColorValue
  ): PressableAndroidRippleConfig => ({
    color: color || Colors.white,
    radius: width / 2
  });

  return (
    <View style={outerContainerStyle()} onLayout={onLayout}>
      <Pressable
        onPress={props.onPress}
        disabled={props.disabled}
        android_ripple={ripple(layout.width, props.rippleColor)}
        style={pressableStyle}>
        {props.children}
      </Pressable>
    </View>
  );
};

export default AppPressable;
