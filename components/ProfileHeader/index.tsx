import React, { ReactElement } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AppText, ImageButton } from "..";
import { AppString, Colors, Margins, Component } from "../../../resources";
import _ from "lodash";

const HEADER_HEIGHT = 48;
const HEADER_BORDER_RADIUS = 16;

interface Props {
  title: string;
  userName?: string;
  childRight?: ReactElement;
  style?: StyleProp<ViewStyle>;
  onBack?: () => void;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: HEADER_BORDER_RADIUS,
    borderBottomRightRadius: HEADER_BORDER_RADIUS,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.black12,
    height: HEADER_HEIGHT,
    paddingHorizontal: Margins.marginSmall,
    backgroundColor: Colors.white
  },
  titlesContainer: { alignItems: "center" },
  rightChildMock: { width: Component.imageButtonSize }
});

const ProfileHeader = (props: Props) => {
  const rootStyle = StyleSheet.compose<ViewStyle>(styles.root, props.style);
  const nav = useNavigation();
  return (
    <View style={rootStyle}>
      <ImageButton iconName="arrow_back" onPress={props.onBack || nav.goBack} />
      <View style={styles.titlesContainer}>
        {!_.isNil(props.userName) && (
          <AppText fontType="label" textColor={Colors.secondaryTextDark}>
            {`${AppString.get().viewingAs} ${props.userName}`.toUpperCase()}
          </AppText>
        )}
        <AppText fontType="subheading_2">{props.title}</AppText>
      </View>
      {props.childRight ? (
        props.childRight
      ) : (
        <View style={styles.rightChildMock} />
      )}
    </View>
  );
};

export default ProfileHeader;
