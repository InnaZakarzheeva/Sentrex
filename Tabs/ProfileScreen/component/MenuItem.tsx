import React from "react";
import {
  Platform,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  View
} from "react-native";
import { IOS_ACTIVE_OPACITY, Margins } from "../../../../../resources";

import { AppIcon, AppText } from "../../../../components";
import { IconNames } from "../../../../components/AppIcon/types";

interface Props {
  title: string;
  icon: IconNames;
  onPress: () => void;
}

export const ITEM_HEIGHT = 56;
const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: Margins.marginDefault
  },
  text: { flex: 1, marginLeft: Margins.marginDefault }
});

const pressableStyle = (state: PressableStateCallbackType) => ({
  opacity: state.pressed && Platform.OS === "ios" ? IOS_ACTIVE_OPACITY : 1
});

const MenuItem = (props: Props) => {
  return (
    <Pressable onPress={props.onPress} style={pressableStyle}>
      <View style={styles.container}>
        <AppIcon name={props.icon} />
        <AppText style={styles.text} fontType="paragraph_1">
          {props.title}
        </AppText>
        <AppIcon name="chevron_right" />
      </View>
    </Pressable>
  );
};

export default MenuItem;
