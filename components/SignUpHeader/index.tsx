import React from "react";
import { View, Image, StyleSheet, ViewStyle } from "react-native";

import { Colors, LogoLuminavColoredSvg, Margins } from "../../../resources";
import { ImageButton } from "../AppButton";
import AppText from "../AppText";
import { Props } from "./types";

const HEADER_HEIGHT = 80;

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Margins.marginBig
  },
  pageBlock: { width: 40 },
  logoImage: {
    width: 96,
    height: 48
  }
});

const SignUpHeader = (props: Props) => {
  const containerStyle = StyleSheet.compose<ViewStyle>(
    styles.container,
    props.style
  );
  return (
    <View style={containerStyle}>
      {props.isHideBack ? (
        <View style={styles.pageBlock} />
      ) : (
        <ImageButton onPress={props.onPress} iconName="arrow_back" />
      )}

      {props.logoUrl ? (
        <Image
          source={{ uri: props.logoUrl }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      ) : (
        <LogoLuminavColoredSvg />
      )}
      {props.currentPage ? (
        <AppText
          fontType="paragraph_1"
          textColor={Colors.neutralDark}
          style={styles.pageBlock}>
          {props.currentPage}/{props.pageNumber ? props.pageNumber : 7}
        </AppText>
      ) : (
        <View style={styles.pageBlock} />
      )}
    </View>
  );
};

export default SignUpHeader;
