import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { Colors } from "../../../resources";

interface Props {
  visible: boolean;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black50
  },
  indicatorContainer: {
    height: 64,
    width: 64,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  }
});

const BlockedLoader = (props: Props) => {
  return props.visible ? (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          size="small"
          animating={props.visible}
          color={Colors.accentBlue}
        />
      </View>
    </View>
  ) : null;
};

export default BlockedLoader;
