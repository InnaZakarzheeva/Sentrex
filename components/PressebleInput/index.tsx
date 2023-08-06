import React, { useEffect, useState } from "react";
import { View, Animated, Pressable } from "react-native";
import _ from "lodash";

import AppText from "../AppText";
import { ArrowRightSvg } from "../../../resources";

import {
  styles,
  labelAnimStyle,
  textInputAnimStyle,
  textValue
} from "./styles";
import { Props } from "./types";

const runTiming = (animValue: Animated.Value, toValue: number) => {
  Animated.timing(animValue, {
    toValue,
    duration: 200,
    useNativeDriver: true
  }).start();
};

const PressebleInput = (props: Props) => {
  const [focusAnimValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!_.isEmpty(props.value)) {
      runTiming(focusAnimValue, 1);
    }
  }, [props.value]);

  return (
    <Pressable
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}>
      <Animated.View style={styles.inputContainer}>
        {props.placeholder && (
          <Animated.Text style={labelAnimStyle(focusAnimValue)}>
            {props.placeholder}
          </Animated.Text>
        )}
        <Animated.View style={textInputAnimStyle(focusAnimValue)}>
          <View style={styles.valueContainer}>
            <AppText
              fontType="paragraph_1"
              style={textValue(_.isEmpty(props.value))}>
              {props.value || props.placeholder}
            </AppText>
            <ArrowRightSvg />
          </View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default PressebleInput;
