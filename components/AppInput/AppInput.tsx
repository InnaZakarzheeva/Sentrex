import _ from "lodash";
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { View, TextInput, Animated, StyleSheet, ViewStyle } from "react-native";

import { Colors } from "../../../resources";
import ImageButton from "../AppButton/ImageButton";

import {
  errorContainerStyle,
  labelAnimStyle,
  styles,
  textInputAnimStyle,
  textInputContainerStyle
} from "./styles";
import { AppInputHandles, Props } from "./types";

const runTiming = (animValue: Animated.Value, toValue: number) => {
  Animated.timing(animValue, {
    toValue,
    duration: 200,
    useNativeDriver: true
  }).start();
};

const AppInput: ForwardRefRenderFunction<AppInputHandles, Props> = (
  props: Props,
  ref: any
) => {
  const [focused, setFocused] = useState(false);
  const [secured, setSecured] = useState(props.secureTextEntry || true);
  const errorOpacity = useRef(new Animated.Value(0));
  const focusAnimValue = useRef(new Animated.Value(0));
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    blur: () => {
      inputRef.current?.blur();
    }
  }));

  useEffect(() => {
    if (errorOpacity.current) {
      runTiming(errorOpacity.current, _.isNil(props.errorLabel) ? 0 : 1);
    }
  }, [props.errorLabel]);

  const handleFocus = useCallback(() => {
    setFocused(true);
    if (focusAnimValue.current && !_.isEmpty(props.value)) {
      runTiming(focusAnimValue.current, 1);
    }
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
    if (focusAnimValue.current && _.isEmpty(props.value)) {
      runTiming(focusAnimValue.current, 0);
    }
  }, [props.value]);

  const handleTextChange = (text: string) => {
    if (focusAnimValue.current && (_.isEmpty(text) || text.length === 1)) {
      runTiming(focusAnimValue.current, text.length === 1 ? 1 : 0);
    }

    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  const clearInput = () => {
    if (props.onChangeText) {
      props.onChangeText("");
    }
    runTiming(focusAnimValue.current, 0);
  };

  const onSecureText = () => {
    setSecured((s) => {
      if (props.onSecureTextChanged) {
        props.onSecureTextChanged(!s);
      }
      return !s;
    });
  };

  const containerStyle = StyleSheet.compose<ViewStyle>(
    styles.container,
    props.containerStyle
  );

  return (
    <View style={containerStyle}>
      <Animated.View style={textInputContainerStyle(focused, props.errorLabel)}>
        {props.placeholder && (
          <Animated.Text style={labelAnimStyle(focusAnimValue.current)}>
            {props.placeholder}
          </Animated.Text>
        )}

        <Animated.View style={textInputAnimStyle(focusAnimValue.current)}>
          <TextInput
            ref={inputRef}
            {...props}
            style={styles.textInput}
            selectionColor={Colors.accentBlue}
            returnKeyType="done"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleTextChange}
            secureTextEntry={
              props.secureTextEntry || (props.withSecureText && secured)
            }
            placeholderTextColor={Colors.placeholder}
          />
        </Animated.View>

        {props.withClear && (
          <ImageButton iconName="cancel" onPress={clearInput} />
        )}
        {props.withSecureText && (
          <ImageButton
            iconName={secured ? "eye" : "eye_off"}
            onPress={onSecureText}
          />
        )}
      </Animated.View>

      {!_.isNil(props.errorLabel) && (
        <Animated.Text style={errorContainerStyle(errorOpacity.current)}>
          {props.errorLabel}
        </Animated.Text>
      )}
    </View>
  );
};

export default forwardRef(AppInput);
