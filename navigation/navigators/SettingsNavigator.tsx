import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SettingsScreen,
  SettingsChangePasswordScreen,
  SettingsChangePhoneScreen,
  SettingsVerifyPhoneScreen,
  SettingsCreatePasswordScreen
} from "../../view/screens";
import { SettingsParamList } from "../types";

const SettingsStack = createStackNavigator<SettingsParamList>();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      headerMode="none"
      initialRouteName="SettingsScreen">
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <SettingsStack.Screen
        name="SettingsChangePasswordScreen"
        component={SettingsChangePasswordScreen}
      />
      <SettingsStack.Screen
        name="SettingsChangePhoneScreen"
        component={SettingsChangePhoneScreen}
      />
      <SettingsStack.Screen
        name="SettingsVerifyPhoneScreen"
        component={SettingsVerifyPhoneScreen}
      />
      <SettingsStack.Screen
        name="SettingsCreatePasswordScreen"
        component={SettingsCreatePasswordScreen}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
