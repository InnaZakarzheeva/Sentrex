import React, { useState } from "react";
import {
  View,
  Animated,
  Modal,
  Pressable,
  Platform,
  EventEmitter
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import _ from "lodash";
import moment from "moment";

import { AppString, ArrowDownSvg, Colors } from "../../../resources";
import AppText from "../AppText";
import { AppButton } from "../AppButton";

import {
  styles,
  labelAnimStyle,
  textInputAnimStyle,
  valueLabel,
  buttonsContainer
} from "./styles";
import { Props } from "./types";

const MAX_DATE = moment()
  .set("year", moment().get("year") - 19)
  .toDate();

const runTiming = (animValue: Animated.Value, toValue: number) => {
  Animated.timing(animValue, {
    toValue,
    duration: 200,
    useNativeDriver: true
  }).start();
};

const DatePickerComponent = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [focusAnimValue] = useState(new Animated.Value(0));
  const [isVisible, setVisible] = useState(false);

  const handleTextChange = (e: Event, value: Date | undefined) => {
    if (value) {
      runTiming(focusAnimValue, 1);
      props.onChangeDate(moment(value).format());
    }
    setVisible(false);
  };

  const IOSPickerModal = () => {
    const [date, setDate] = useState(
      props.isUseMaxDate ? MAX_DATE : new Date()
    );

    const cancelDate = () => {
      setDate(new Date());
      setVisible(false);
    };

    const onChange = (e: Event, date: Date | undefined) => {
      if (date) {
        setDate(date);
      }
    };

    return (
      <Modal
        presentationStyle="overFullScreen"
        onRequestClose={setVisible.bind(this, false)}
        visible={isVisible}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <View style={styles.IOSPickerWrapper}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <AppText fontType="subheading_1" style={styles.headerLabel}>
                {AppString.get().dateOfBirth}
              </AppText>
              <AppText
                fontType="paragraph_1"
                style={styles.headerLabel}
                textColor={Colors.accentTurquoise}>
                {moment(date).format("MMM DD, YYYY")}
              </AppText>
            </View>
            <View style={styles.separator} />
            <DatePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
              maximumDate={props.isUseMaxDate ? MAX_DATE : new Date()}
              minimumDate={new Date("1900-01-01")}
            />

            <View style={buttonsContainer(insets.bottom)}>
              <AppButton
                title={AppString.get().cancel}
                onPress={cancelDate}
                styleMode="text"
                titleStyle={{ color: Colors.secondaryTextDark }}
              />
              <AppButton
                title={AppString.get().confirmDate}
                onPress={handleTextChange.bind(this, EventEmitter, date)}
                styleMode="text"
                titleStyle={{ color: Colors.accentBlue }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderPicker = () => {
    if (isVisible) {
      switch (Platform.OS) {
        case "ios":
          return <IOSPickerModal />;
        case "android":
          return (
            <DatePicker
              value={props.value ? new Date(props.value) : new Date()}
              mode="date"
              display="calendar"
              onChange={handleTextChange}
              maximumDate={props.isUseMaxDate ? MAX_DATE : new Date()}
            />
          );
      }
    }
  };

  return (
    <>
      <Pressable style={styles.container} onPress={setVisible.bind(this, true)}>
        <Animated.View style={styles.datePickerContainer}>
          {props.placeholder && (
            <Animated.Text style={labelAnimStyle(focusAnimValue)}>
              {props.placeholder}
            </Animated.Text>
          )}

          <Animated.View style={textInputAnimStyle(focusAnimValue)}>
            <View style={styles.labelWrapper}>
              <AppText
                fontType="paragraph_1"
                style={valueLabel(_.isEmpty(props.value))}>
                {props.value
                  ? moment(props.value).format("MMM DD, YYYY")
                  : props.placeholder}
              </AppText>
              <ArrowDownSvg />
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>
      {renderPicker()}
    </>
  );
};

export default DatePickerComponent;
