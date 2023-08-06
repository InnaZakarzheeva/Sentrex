import { ColorValue } from "react-native";

export type IconNames =
  | "eye"
  | "eye_off"
  | "cancel"
  | "info"
  | "not_allowed"
  | "request_success"
  | "error"
  | "arrow_back"
  | "chevron_right"
  | "about"
  | "health_card"
  | "insurance"
  | "address"
  | "prescription"
  | "fin_assistance"
  | "program"
  | "log_out"
  | "edit"
  | "delete"
  | "check"
  | "circle_plus"
  | "dispenses";

export interface Props {
  name: IconNames;
  color?: ColorValue;
  size?: number;
}
