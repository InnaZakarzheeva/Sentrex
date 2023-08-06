import _ from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { View, TextInput, Animated } from "react-native";

import { AppString, Colors, SearchSvg } from "../../../resources";
import { ImageButton } from "..";

import { styles, textInputContainerStyle } from "./styles";
import { Props } from "./types";

const runTiming = (animValue: Animated.Value, toValue: number) => {
  Animated.timing(animValue, {
    toValue,
    duration: 200,
    useNativeDriver: true
  }).start();
};

const SearchInput = (props: Props) => {
  const [focused, setFocused] = useState(false);
  const focusAnimValue = useRef(new Animated.Value(0));
  const inputRef = useRef<TextInput>(null);

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

  return (
    <View style={styles.container}>
      <Animated.View style={textInputContainerStyle(focused)}>
        <SearchSvg />
        <TextInput
          ref={inputRef}
          {...props}
          style={styles.textInput}
          selectionColor={Colors.accentBlue}
          returnKeyType="done"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          placeholder={AppString.get().search}
        />
        {props.withClear && (
          <ImageButton iconName="cancel" onPress={clearInput} />
        )}
      </Animated.View>
    </View>
  );
};

export default SearchInput;
