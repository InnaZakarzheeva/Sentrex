import React from "react";
import { View } from "react-native";

import {
  AboutIconSvg,
  AddressSvg,
  ArrowBackSvg,
  CancelSvg,
  CheckSvg,
  ChevronRightSvg,
  Colors,
  DeleteSvg,
  DispensesSvg,
  EditSvg,
  ErrorSvg,
  EyeOffSvg,
  EyeSvg,
  FinAssistanceSvg,
  HealthCardSvg,
  InfoSvg,
  InsuranceSvg,
  LogoutSvg,
  NotAllowedSvg,
  PlusSvg,
  PrescriptionSvg,
  ProgramSvg,
  RequestSuccessSvg
} from "../../../resources";

import { styles } from "./styles";
import { Props } from "./types";

const AppIcon = (props: Props) => {
  return <View style={styles.rootContainer}>{getIconFromRNVI(props)}</View>;
};

const DEFAULT_ICON_SIZE = 24;

const getIconFromRNVI = (props: Props) => {
  switch (props.name) {
    case "eye":
      return (
        <EyeSvg
          color={props.color || Colors.icon}
          size={props.size || DEFAULT_ICON_SIZE}
        />
      );
    case "eye_off":
      return (
        <EyeOffSvg
          color={props.color || Colors.icon}
          size={props.size || DEFAULT_ICON_SIZE}
        />
      );
    case "cancel":
      return (
        <CancelSvg
          color={props.color || Colors.icon}
          size={props.size || DEFAULT_ICON_SIZE}
        />
      );
    case "info":
      return <InfoSvg size={props.size || DEFAULT_ICON_SIZE} />;
    case "not_allowed":
      return <NotAllowedSvg />;
    case "request_success":
      return <RequestSuccessSvg />;
    case "arrow_back":
      return <ArrowBackSvg />;
    case "error":
      return <ErrorSvg />;
    case "chevron_right":
      return (
        <ChevronRightSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "about":
      return (
        <AboutIconSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "health_card":
      return (
        <HealthCardSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "insurance":
      return (
        <InsuranceSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "address":
      return (
        <AddressSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "prescription":
      return (
        <PrescriptionSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "dispenses":
      return (
        <DispensesSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "fin_assistance":
      return (
        <FinAssistanceSvg
          size={props.size}
          color={props.color || Colors.icon}
        />
      );
    case "program":
      return (
        <ProgramSvg size={props.size} color={props.color || Colors.icon} />
      );
    case "log_out":
      return <LogoutSvg size={props.size} color={props.color || Colors.icon} />;
    case "edit":
      return <EditSvg size={props.size} />;
    case "delete":
      return <DeleteSvg size={props.size} />;
    case "check":
      return <CheckSvg size={props.size} />;
    case "circle_plus":
      return <PlusSvg />;
  }
};

export default AppIcon;
