import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SignUpScreen,
  BrandsScreen,
  AboutYouScreen,
  AccountTypeScreen,
  PatientScreen,
  AlmostDoneScreen,
  ConfirmPhoneScreen,
  CreatePasswordScreen
} from "../../view/screens";
import { SignUpParamList } from "../types";

const SignUpStack = createStackNavigator<SignUpParamList>();

const SignUpNavigator = () => {
  return (
    <SignUpStack.Navigator headerMode="none" initialRouteName="SignUpScreen">
      <SignUpStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <SignUpStack.Screen name="BrandsScreen" component={BrandsScreen} />
      <SignUpStack.Screen name="AboutYouScreen" component={AboutYouScreen} />
      <SignUpStack.Screen
        name="AccountTypeScreen"
        component={AccountTypeScreen}
      />
      <SignUpStack.Screen name="PatientScreen" component={PatientScreen} />
      <SignUpStack.Screen
        name="AlmostDoneScreen"
        component={AlmostDoneScreen}
      />
      <SignUpStack.Screen
        name="ConfirmPhoneScreen"
        component={ConfirmPhoneScreen}
      />
      <SignUpStack.Screen
        name="CreatePasswordScreen"
        component={CreatePasswordScreen}
      />
    </SignUpStack.Navigator>
  );
};

export default SignUpNavigator;
