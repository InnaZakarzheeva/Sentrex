import { StyleProp, ViewStyle } from "react-native";

export type Props = {
  currentPage?: number;
  onPress?: () => void;
  logoUrl?: string;
  style?: StyleProp<ViewStyle>;
  pageNumber?: number;
  isHideBack?: boolean;
};
