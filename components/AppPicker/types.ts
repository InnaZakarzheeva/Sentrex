import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface PickerItemView<T> {
  type: T;
  title: string;
}

export interface Props<T> {
  onChange: (value: T) => void;
  value: T | undefined;
  data: Array<PickerItemView<T>>;
  columns: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}
