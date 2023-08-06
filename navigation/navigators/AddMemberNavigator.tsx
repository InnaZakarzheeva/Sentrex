import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  AddMemberAlmostDoneScreen,
  AddMemberBrandScreen,
  AddMemberDispensesScreen,
  AddMemberInsurerScreen,
  AddMemberPrescriptionsScreen,
  AddMemberScreen,
  AddMemberHealthCardScreen
} from "../../view/screens";
import { AddMemberParamList } from "../types";

const AddMemberStack = createStackNavigator<AddMemberParamList>();

const AddMemberNavigator = () => {
  return (
    <AddMemberStack.Navigator
      headerMode="none"
      initialRouteName="AddMemberBrandScreen">
      <AddMemberStack.Screen
        name="AddMemberBrandScreen"
        component={AddMemberBrandScreen}
      />
      <AddMemberStack.Screen
        name="AddMemberScreen"
        component={AddMemberScreen}
      />
      <AddMemberStack.Screen
        name="AddMemberAlmostDoneScreen"
        component={AddMemberAlmostDoneScreen}
      />
      <AddMemberStack.Screen
        name="AddMemberPrescriptionsScren"
        component={AddMemberPrescriptionsScreen}
      />
      <AddMemberStack.Screen
        name="AddMemberDispensesScreen"
        component={AddMemberDispensesScreen}
      />
      <AddMemberStack.Screen
        name="AddMemberInsurerScreen"
        component={AddMemberInsurerScreen}
      />
      <AddMemberStack.Screen
        name="AddMemberHealthCardsScreen"
        component={AddMemberHealthCardScreen}
      />
    </AddMemberStack.Navigator>
  );
};

export default AddMemberNavigator;
