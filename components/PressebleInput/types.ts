import { StyleProp, ViewStyle } from "react-native";

export interface Props {
  placeholder: string;
  value: string | undefined;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}
