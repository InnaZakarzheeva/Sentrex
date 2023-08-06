import {
  NavigationContainerRef,
  NavigationState,
  PartialState
} from "@react-navigation/native";
import _ from "lodash";
import React from "react";

const isMountedRef = React.createRef<boolean>();
const navigationRef = React.createRef<NavigationContainerRef>();

const navigateTo = (routeName: string, params?: any) => {
  if (navigationRef.current) {
    navigationRef.current.navigate(routeName, params);
  }
};

const navigateBack = () => {
  if (navigationRef.current) {
    navigationRef.current.goBack();
  }
};

const getActiveRouteName = (
  state: NavigationState | undefined | PartialState<NavigationState>
): string => {
  if (!_.isUndefined(state) && !_.isNil(state.index)) {
    const routeByIndex = state.routes[state.index];
    if (routeByIndex.state) {
      return getActiveRouteName(routeByIndex.state);
    }
    return routeByIndex.name;
  }

  return "";
};

export {
  isMountedRef,
  navigationRef,
  navigateTo,
  navigateBack,
  getActiveRouteName
};
