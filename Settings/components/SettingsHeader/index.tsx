import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors, Margins } from "../../../../../resources";
import { AppText, ImageButton } from "../../../../components";

interface Props {
  onBack: () => void;
  title: string;
  step?: number;
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Margins.marginDefault,
    paddingBottom: Margins.marginDefault,
    borderTopWidth: 0,
    borderWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: Colors.inputBorder
  },
  emptyStep: {
    width: 25
  }
});

const SettingsHeader = (props: Props) => {
  return (
    <View style={styles.headerWrapper}>
      <ImageButton iconName="arrow_back" onPress={props.onBack} size={24} />
      <AppText fontType="subheading_1">{props.title}</AppText>
      {props.step ? (
        <AppText fontType="paragraph_1">{props.step}/2</AppText>
      ) : (
        <View style={styles.emptyStep} />
      )}
    </View>
  );
};

export default SettingsHeader;
