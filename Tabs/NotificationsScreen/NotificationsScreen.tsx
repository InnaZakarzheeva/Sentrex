import React from "react";
import { Text } from "react-native";

import { ScreenContainer } from "../../../components";

import { styles } from "./styles";
import Props from "./types";

const NotificationsScreen = (props: Props) => {
  return (
    <ScreenContainer style={styles.root}>
      <Text>Notifications tab</Text>
    </ScreenContainer>
  );
};

export default NotificationsScreen;
