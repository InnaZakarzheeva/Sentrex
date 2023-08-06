import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ResetPasswordCodeScreen,
  ResetPasswordPassScreen,
  ResetPasswordPhoneScreen
} from "../../view/screens";
import { ForgotPasswordParamList } from "../types";

const ResetPasswordStack = createStackNavigator<ForgotPasswordParamList>();

const ResetPasswordNavigator = () => {
  return (
    <ResetPasswordStack.Navigator
      headerMode="none"
      initialRouteName="ResetPasswordPhoneScreen">
      <ResetPasswordStack.Screen
        name="ResetPasswordPhoneScreen"
        component={ResetPasswordPhoneScreen}
      />
      <ResetPasswordStack.Screen
        name="ResetPasswordCodeScreen"
        component={ResetPasswordCodeScreen}
      />
      <ResetPasswordStack.Screen
        name="ResetPasswordPassScreen"
        component={ResetPasswordPassScreen}
      />
    </ResetPasswordStack.Navigator>
  );
};

export default ResetPasswordNavigator;
