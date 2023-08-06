import { Animated, StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface Props extends TextInputProps {
  withClear?: boolean;
  withSecureText?: boolean;
  errorLabel?: string | null;
  onSecureTextChanged?: (secure: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface AppInputWithReplacerProps extends Props {
  animValue: Animated.Value;
}

export interface AppInputHandles {
  focus: () => void;
  blur: () => void;
}
