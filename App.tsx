import React, { useRef } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, NavigationState } from "@react-navigation/native";
import { Provider } from "react-redux";

import RootNavigator, { getActiveRouteName, navigationRef } from "./navigation";
import { store } from "./state";

const App = () => {
  const routeNameRef = useRef("");
  const handleNavigationStateChanged = (state: NavigationState | undefined) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
    }

    routeNameRef.current = currentRouteName;
  };

  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleNavigationStateChanged}>
        <StatusBar
          translucent={true}
          hidden={false}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
