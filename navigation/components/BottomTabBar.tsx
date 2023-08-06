import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  View,
  Pressable,
  PressableStateCallbackType,
  Platform,
  ViewStyle
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDimensions } from "@react-native-community/hooks";

import { HomeSvg, BellSvg, UserSvg, Component } from "../../resources";

const pressableStyle = (state: PressableStateCallbackType): ViewStyle => ({
  flex: 1,
  opacity: state.pressed && Platform.OS === "ios" ? 0.5 : 1,
  justifyContent: "center",
  alignItems: "center"
});

const barStyle = (bottomInset: number): ViewStyle => ({
  flexDirection: "row",
  backgroundColor: "white",
  height:
    (Platform.select({
      ios: Component.bottomTabBarHeightIos,
      android: Component.bottomTabBarHeightAndroid
    }) || 0) + bottomInset,
  paddingBottom: bottomInset,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 8
});

const Icon = (props: { index: number; isFocused: boolean }) => {
  switch (props.index) {
    case 0:
      return <HomeSvg color={props.isFocused ? "#00B5AE" : "#798395"} />;
    case 1:
      return <BellSvg color={props.isFocused ? "#00B5AE" : "#798395"} />;
    case 2:
      return <UserSvg color={props.isFocused ? "#00B5AE" : "#798395"} />;
    default:
      return null;
  }
};

const BottomTabBar = ({
  state,
  descriptors,
  navigation
}: BottomTabBarProps) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const defaultInsets = useSafeAreaInsets();
  const d = useDimensions();

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={barStyle(defaultInsets.bottom)}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={pressableStyle}
            android_ripple={{
              color: "#00B5AE",
              radius: d.screen.width / 3 / 2
            }}>
            <Icon index={index} isFocused={isFocused} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
