import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AdditionalStepsParamList } from "../../types";
import {
  AddPrescriptionsScreen,
  AddDispenceScreen,
  AddHealthCardScreen,
  AddInsurerScreen,
  ScheduleCallScreen
} from "../../../view/screens";

import { Props } from "./index";

const AddingStepsStack = createStackNavigator<AdditionalStepsParamList>();

const AdditionalStepsNavigator = (props: Props) => {
  const renderAvailableScreen = () => {
    switch (props.currentAdditionalScreen) {
      case "AddPrescription":
        return (
          <AddingStepsStack.Screen
            name="AddPrescriptionScreen"
            component={AddPrescriptionsScreen}
          />
        );
      case "AddDispence":
        return (
          <AddingStepsStack.Screen
            name="AddDispenceScreen"
            component={AddDispenceScreen}
          />
        );
      case "AddHealthCard":
        return (
          <AddingStepsStack.Screen
            name="AddHealthCardScreen"
            component={AddHealthCardScreen}
          />
        );
      case "AddInsurer":
        return (
          <AddingStepsStack.Screen
            name="AddInsurerScreen"
            component={AddInsurerScreen}
          />
        );
      case "ScheduleCall":
        return (
          <AddingStepsStack.Screen
            name="ScheduleCallScreen"
            component={ScheduleCallScreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AddingStepsStack.Navigator
      headerMode="none"
      initialRouteName="AddPrescriptionScreen">
      {renderAvailableScreen()}
    </AddingStepsStack.Navigator>
  );
};

export default AdditionalStepsNavigator;
