import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import {
  AppString,
  ArrowDownSvg,
  Colors,
  DotsSvg,
  LogoLuminavColoredSvg,
  Margins
} from "../../../resources";
import { BrandView, PatientPayload } from "../../../state";
import AppText from "../AppText";

interface Props {
  changeUser: () => void;
  changeBrand: () => void;
  openSettings: () => void;
  brand: BrandView | undefined;
  user: PatientPayload | undefined;
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Margins.marginBig,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 50
  },
  headersBlock: {
    flex: 1,
    justifyContent: "center",
    height: 40
  },
  brandBlock: {
    alignItems: "flex-end",
    flexDirection: "row"
  },
  dotsBlock: {
    flex: 0.7,
    alignItems: "flex-end",
    paddingRight: Margins.marginSmall
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    marginTop: Margins.marginMicro,
    marginRight: Margins.marginMicro
  },
  logoImage: {
    width: 72,
    height: 40
  },
  emptyBlock: {
    height: 20
  },
  dots: {
    width: 40,
    alignItems: "flex-end"
  }
});

const MainHeader = (props: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.headersBlock}>
        <AppText fontType="label" textColor={Colors.secondaryTextDark}>
          {AppString.get().viewingAs.toUpperCase()}
        </AppText>
        {props.user ? (
          <Pressable style={styles.nameWrapper} onPress={props.changeUser}>
            <AppText fontType="subheading_2" style={styles.name}>
              {props.user.firstName}
            </AppText>
            <ArrowDownSvg />
          </Pressable>
        ) : (
          <View style={styles.emptyBlock} />
        )}
      </View>

      <Pressable
        style={[styles.headersBlock, styles.brandBlock]}
        onPress={props.changeBrand}>
        {props.brand ? (
          <Image
            source={{ uri: props.brand.logoPath }}
            style={styles.logoImage}
            resizeMode="contain"
          />
        ) : (
          <LogoLuminavColoredSvg />
        )}
        <ArrowDownSvg />
      </Pressable>

      <View style={[styles.headersBlock, styles.dotsBlock]}>
        <Pressable onPress={props.openSettings} style={styles.dots}>
          <DotsSvg />
        </Pressable>
      </View>
    </View>
  );
};

export default MainHeader;
