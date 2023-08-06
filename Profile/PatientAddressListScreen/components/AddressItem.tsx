import _ from "lodash";
import React from "react";
import {
  Platform,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import { useSelector } from "react-redux";

import {
  AppString,
  Colors,
  Margins,
  IOS_ACTIVE_OPACITY
} from "../../../../../resources";
import {
  PatientAddressView,
  provinceByIdSelector1,
  ReduxStore
} from "../../../../../state";

import { AppIcon, AppText, ImageButton } from "../../../../components";

interface Props {
  address: PatientAddressView;
  onDeletePress: (id: string) => void;
  onEditPress: (id: string) => void;
  onPress?: (id: string) => void;
}

const BORDER_RADIUS_OUTER = 8;
const BORDER_WIDTH_OUTER = 3;
const BORDER_RADIUS_INNER = 6;
const BORDER_WIDTH_INNER = 1;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: Margins.marginSmall,
    justifyContent: "space-between"
  },
  topInnerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginHorizontal: Margins.marginDefault
  }
});

const rootStyle = (isPrimary: boolean): ViewStyle => ({
  overflow: "hidden",
  borderColor: isPrimary ? Colors.accentTurquoiseLight : "transparent",
  borderWidth: BORDER_WIDTH_OUTER,
  borderRadius: BORDER_RADIUS_OUTER,
  marginVertical: Margins.marginSmall
});

const pressableStyle = (isPrimary: boolean) => (
  state: PressableStateCallbackType
) => ({
  opacity: state.pressed && Platform.OS === "ios" ? IOS_ACTIVE_OPACITY : 1,
  paddingBottom: Margins.marginMiddle,
  borderWidth: BORDER_WIDTH_INNER,
  borderRadius: BORDER_RADIUS_INNER,
  borderColor: isPrimary ? Colors.accentTurquoise : Colors.icon,
  backgroundColor: Colors.white
});

const AddressItem = (props: Props) => {
  const province = useSelector((state: ReduxStore) =>
    provinceByIdSelector1(state, props.address.provinceKey)
  );
  const onDeletePess = () => {
    props.onDeletePress(props.address.id);
  };

  const onEditPess = () => {
    props.onEditPress(props.address.id);
  };

  const onPress = () => {
    if (props.onPress) {
      props.onPress(props.address.id);
    }
  };

  return (
    <View style={rootStyle(props.address.isPrimary)}>
      <Pressable
        disabled={true}
        onPress={onPress}
        style={pressableStyle(props.address.isPrimary)}>
        <View style={styles.topContainer}>
          {props.address.isPrimary ? (
            <View style={styles.topInnerContainer}>
              <AppIcon name="check" />
              <AppText fontType="label" textColor={Colors.accentTurquoise}>
                {AppString.get().primary.toUpperCase()}
              </AppText>
            </View>
          ) : (
            <View />
          )}

          <View style={styles.topInnerContainer}>
            <ImageButton iconName="edit" onPress={onEditPess} />
            <ImageButton iconName="delete" onPress={onDeletePess} />
          </View>
        </View>

        <AppText fontType="paragraph_2" style={styles.text}>
          {props.address.street}
        </AppText>
        <AppText fontType="paragraph_2" style={styles.text}>
          {props.address.city}
        </AppText>
        <AppText fontType="paragraph_2" style={styles.text}>
          {`${province ? province.displayName : ""} ${
            !_.isEmpty(props.address.postalCode)
              ? `- ${props.address.postalCode}`
              : ""
          }`}
        </AppText>
      </Pressable>
    </View>
  );
};

export default AddressItem;
