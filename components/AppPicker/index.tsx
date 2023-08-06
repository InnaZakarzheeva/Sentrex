import _ from "lodash";
import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle
} from "react-native";

import AppText from "../AppText";

import { styles, buttonStyle, buttonTitleStyle } from "./styles";
import { Props } from "./types";

const AppPicker = <T extends any>(props: Props<T>) => {
  const containerStyle = StyleSheet.compose<ViewStyle>(
    styles.container,
    props.style
  );

  const titleStyle = (isActive: boolean) =>
    StyleSheet.compose<TextStyle>(buttonTitleStyle(isActive), props.titleStyle);

  return (
    <View style={containerStyle}>
      {props.data.map((item) => {
        return (
          <Pressable
            style={buttonStyle(
              _.isEqual(props.value, item.type),
              props.columns
            )}
            onPress={props.onChange.bind(this, item.type)}
            key={item.type as string}>
            <AppText
              fontType="subheading_2"
              style={titleStyle(_.isEqual(props.value, item.type))}>
              {item.title}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

export default AppPicker;
