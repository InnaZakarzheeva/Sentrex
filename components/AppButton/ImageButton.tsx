import React from "react";
import {
  Pressable,
  PressableStateCallbackType,
  Platform,
  PressableAndroidRippleConfig
} from "react-native";

import { Colors, Component, IOS_ACTIVE_OPACITY } from "../../../resources";
import AppIcon from "../AppIcon";
import { IconNames } from "../AppIcon/types";

interface Props {
  iconName: IconNames;
  onPress?: () => void;
  disabled?: boolean;
  size?: number;
}

const ImageButton = (props: Props) => {
  const pressableStyle = (state: PressableStateCallbackType): any => {
    return {
      opacity: state.pressed && Platform.OS === "ios" ? IOS_ACTIVE_OPACITY : 1,
      height: props.size || Component.imageButtonSize,
      width: props.size || Component.imageButtonSize,
      justifyContent: "center",
      alignItems: "center"
    };
  };

  const ripple = (): PressableAndroidRippleConfig => ({
    color: Colors.turquoiseLight,
    radius: props.size || Component.imageButtonSize / 2
  });

  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={pressableStyle}
      android_ripple={ripple()}>
      <AppIcon name={props.iconName} />
    </Pressable>
  );
};

export default ImageButton;
