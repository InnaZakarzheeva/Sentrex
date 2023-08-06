import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import {
  HomeScreen,
  NotificationsScreen,
  ProfileScreen
} from "../../view/screens";

import { TabsParamList } from "../types";
import { BottomTabBar } from "../components";

const MainTabs = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => (
  <MainTabs.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <MainTabs.Screen name="HomeScreen" component={HomeScreen} />
    <MainTabs.Screen
      name="NotificationsScreen"
      component={NotificationsScreen}
    />
    <MainTabs.Screen name="ProfileScreen" component={ProfileScreen} />
  </MainTabs.Navigator>
);

export default TabsNavigator;
