import React, { memo } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import { SvgUri } from "react-native-svg";
import { Colors, Component, Margins } from "../../../resources";

interface Props {
  logoUri: string;
  isSelected: boolean;
  onPress: () => void;
}
const ITEM_HEIGHT = 88;

const brandWrapper = (isChosen: boolean): ViewStyle => ({
  height: ITEM_HEIGHT,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: isChosen ? Colors.accentTurquoise : Colors.inputBorder,
  borderRadius: Component.appButtonBorderRadius
});

const brandOutWrapper = (isChosen: boolean) => ({
  borderWidth: 3,
  borderColor: isChosen ? Colors.accentTurquoiseLight : Colors.white,
  borderRadius: 10,
  marginHorizontal: Margins.marginBig
});

const BrandItem = (props: Props) => {
  return (
    <View style={brandOutWrapper(props.isSelected)}>
      <Pressable onPress={props.onPress} style={brandWrapper(props.isSelected)}>
        <SvgUri uri={props.logoUri} width={160} height={72} />
      </Pressable>
    </View>
  );
};

export default memo(BrandItem);
