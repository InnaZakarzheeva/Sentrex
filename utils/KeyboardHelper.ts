import { useCallback, useEffect, useRef } from "react";
import { Animated, Keyboard, StatusBar } from "react-native";

const runTiming = (
  animValue: Animated.Value,
  toValue: number,
  duration: number
) => {
  Animated.timing(animValue, {
    toValue,
    duration,
    useNativeDriver: true
  }).start();
};

const useKeyboardWithAnim = (
  duration: number,
  withStatusBarHandled?: boolean
) => {
  const animator = useRef(new Animated.Value(0));

  const keyboardWillShowCallback = useCallback((e) => {
    if (withStatusBarHandled) {
      StatusBar.setBarStyle("dark-content");
    }
    runTiming(animator.current, 1, duration);
  }, []);

  const keyboardWillHideCallback = useCallback((e) => {
    if (withStatusBarHandled) {
      StatusBar.setBarStyle("light-content");
    }
    runTiming(animator.current, 0, duration);
  }, []);

  const keyboardDidShowCallback = useCallback((e) => {
    if (withStatusBarHandled) {
      StatusBar.setBarStyle("dark-content");
    }
    runTiming(animator.current, 1, duration);
  }, []);

  const keyboardDidHideCallback = useCallback((e) => {
    if (withStatusBarHandled) {
      StatusBar.setBarStyle("light-content");
    }
    runTiming(animator.current, 0, duration);
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShowCallback);
    Keyboard.addListener("keyboardWillHide", keyboardWillHideCallback);
    Keyboard.addListener("keyboardDidShow", keyboardDidShowCallback);
    Keyboard.addListener("keyboardDidHide", keyboardDidHideCallback);

    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShowCallback);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHideCallback);
      Keyboard.removeListener("keyboardDidShow", keyboardDidShowCallback);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHideCallback);
    };
  }, []);

  return animator.current;
};

export { useKeyboardWithAnim };
