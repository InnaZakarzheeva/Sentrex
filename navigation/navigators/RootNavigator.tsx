import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  AddEditPatientAddressScreen,
  PatientAddressListScreen,
  SignInScreen,
  SplashScreen,
  AboutScreen,
  HealthCardScreen,
  InsuranceScreen,
  PrescriptionsScreen,
  DispensesScreen
} from "../../view/screens";

import { RootStackParamList } from "../types";
import TabsNavigator from "./TabsNavigator";
import SignUpNavigator from "./SignUpNavigator";
import ResetPasswordNavigator from "./ResetPasswordNavigator";
import { Props } from "./index";
import AdditionalStepsNavigator from "./AdditionalStepsNavigator";
import SettingsNavigator from "./SettingsNavigator";
import AddMemberNavigator from "./AddMemberNavigator";

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = (props: Props) => {
  return (
    <RootStack.Navigator headerMode="none" initialRouteName="SplashScreen">
      {props.splashShown ? (
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      ) : props.userLoggedIn ? (
        renderLoggedIn(props)
      ) : (
        renderRegistered(props)
      )}
    </RootStack.Navigator>
  );
};

const renderLoggedIn = (props: Props) => {
  return props.additionalStepsPassed ? (
    <>
      <RootStack.Screen name="TabsNavigator" component={TabsNavigator} />
      <RootStack.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
      <RootStack.Screen
        name="AddMemberNavigator"
        component={AddMemberNavigator}
      />
      <RootStack.Screen
        name="PatientAddressListScreen"
        component={PatientAddressListScreen}
      />
      <RootStack.Screen
        name="AddEditPatientAddressScreen"
        component={AddEditPatientAddressScreen}
      />
      <RootStack.Screen name="AboutScreen" component={AboutScreen} />
      <RootStack.Screen name="HealthCardScreen" component={HealthCardScreen} />
      <RootStack.Screen name="InsuranceScreen" component={InsuranceScreen} />
      <RootStack.Screen
        name="PrescriptionsScreen"
        component={PrescriptionsScreen}
      />
      <RootStack.Screen name="DispensesScreen" component={DispensesScreen} />
    </>
  ) : (
    <RootStack.Screen
      name="AdditionalStepsNavigator"
      component={AdditionalStepsNavigator}
    />
  );
};

const renderRegistered = (props: Props) => {
  return props.userRegistered ? (
    props.userForgotPassword ? (
      <RootStack.Screen
        name="ForgotPasswordNavigator"
        component={ResetPasswordNavigator}
      />
    ) : (
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    )
  ) : (
    <RootStack.Screen name="SignUpNavigator" component={SignUpNavigator} />
  );
};

export default RootNavigator;
