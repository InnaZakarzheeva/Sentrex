import { useKeyboard } from "@react-native-community/hooks";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import { View, Animated } from "react-native";

import { Colors } from "../../../resources";
import ImageButton from "../AppButton/ImageButton";
import AppInput from "./AppInput";

import {
  errorContainerStyle,
  labelAnimStyle,
  styles,
  textInputContainerStyle
} from "./styles";
import { AppInputHandles, AppInputWithReplacerProps } from "./types";

const runTiming = (
  animValue: Animated.Value,
  toValue: number,
  callback?: Animated.EndCallback
) => {
  Animated.timing(animValue, {
    toValue,
    duration: 200,
    useNativeDriver: true
  }).start(callback);
};

const AppInputWithReplacer = (props: AppInputWithReplacerProps) => {
  const inputRef = useRef<AppInputHandles>(null);
  const [secured, setSecured] = useState(props.withSecureText);
  const [inputShown, setInputShown] = useState(false);
  const keyboard = useKeyboard();

  useEffect(() => {
    if (!keyboard.keyboardShown) {
      setInputShown(false);
    }
  }, [keyboard.keyboardShown]);

  const onSecureText = () => {
    setSecured((s) => {
      return !s;
    });
  };

  const onPresss = () => {
    runTiming(props.animValue, 1, () => {
      setInputShown(true);
    });
  };

  const secureText = (value?: string) => {
    if (!_.isNil(value) && !_.isEmpty(value)) {
      let dots = "";
      for (let i = 0; i < value.length; i++) {
        dots = dots.concat(`\u2022`);
      }
      return dots;
    }
    return value;
  };

  const handleSecureTextChanged = (secure: boolean) => {
    setSecured(secure);
  };

  return inputShown ? (
    <AppInput
      ref={inputRef}
      {...props}
      autoFocus={true}
      secureTextEntry={secured}
      onSecureTextChanged={handleSecureTextChanged}
    />
  ) : (
    <TouchableWithoutFeedback onPress={onPresss}>
      <View style={[styles.container, props.style]}>
        <View style={textInputContainerStyle(false, null)}>
          {!_.isNil(props.value) && !_.isEmpty(props.value) && (
            <Text style={labelAnimStyle(1)}>{props.placeholder}</Text>
          )}

          <View
            style={{
              marginRight: 16,
              flex: 1,
              transform: [
                { translateY: props.placeholder && props.value ? 6 : 0 }
              ]
            }}>
            <Text
              style={{
                fontSize: 18,
                color:
                  !_.isNil(props.value) && !_.isEmpty(props.value)
                    ? Colors.primaryTextDark
                    : Colors.placeholder
              }}>
              {!_.isNil(props.value) && !_.isEmpty(props.value)
                ? secured
                  ? secureText(props.value)
                  : props.value
                : props.placeholder}
            </Text>
          </View>

          {props.withSecureText && (
            <ImageButton
              iconName={secured ? "eye" : "eye_off"}
              onPress={onSecureText}
            />
          )}
        </View>
        {!_.isNil(props.errorLabel) && (
          <Animated.Text style={errorContainerStyle(1)}>
            {props.errorLabel}
          </Animated.Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppInputWithReplacer;
