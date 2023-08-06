import React from "react";
import { View } from "react-native";

import { LogoLuminavWhiteSvg } from "../../../resources";
import { ScreenBg, ScreenContainer } from "../../components";

import { styles } from "./styles";
import Props from "./types";

const SplashScreen = (props: Props) => {
  return (
    <>
      <ScreenBg />
      <ScreenContainer style={styles.root}>
        <LogoLuminavWhiteSvg />
        <View style={styles.mockLoader} />
      </ScreenContainer>
    </>
  );
};

export default SplashScreen;
