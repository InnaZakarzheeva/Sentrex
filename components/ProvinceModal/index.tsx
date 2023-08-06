import React, { useEffect } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ProfileHeader } from "..";

import { AppString, Colors, Margins } from "../../../resources";
import {
  authBrandByIdSelector,
  getProvincesAsyncAction,
  ProvinceView,
  allProvincesSelector
} from "../../../state";
import AppText from "../AppText";
import SignUpHeader from "../SignUpHeader";

interface Props {
  onProvinceSelected: (province: ProvinceView) => void;
  onClose: () => void;
  visible: boolean;
  isAddMember?: boolean;
}

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: Colors.white
  },
  labelWrapper: {
    height: 48,
    paddingHorizontal: Margins.marginDefault
  },
  label: { color: Colors.neutralDark }
});

const header = (insets: EdgeInsets) => ({
  paddingHorizontal: Margins.marginDefault,
  height: 48,
  marginBottom: Margins.marginMiddle,
  marginTop: insets.top
});

const ProvinceModal = (props: Props) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const brand = useSelector(authBrandByIdSelector);
  const data = useSelector(allProvincesSelector);

  useEffect(() => {
    dispatch(getProvincesAsyncAction());
  }, []);

  const onChange = (item: ProvinceView) => {
    props.onProvinceSelected(item);
  };

  const renderItem = ({ item }: { item: ProvinceView }) => {
    return (
      <Pressable
        onPress={onChange.bind(this, item)}
        style={styles.labelWrapper}>
        <AppText fontType="paragraph_1" style={styles.label}>
          {item.displayName}
        </AppText>
      </Pressable>
    );
  };

  return (
    <Modal
      presentationStyle="overFullScreen"
      onRequestClose={props.onClose}
      visible={props.visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="slide">
      <View style={styles.modalBg}>
        {props.isAddMember ? (
          <ProfileHeader
            title={AppString.get().selectProvince}
            style={header(insets)}
            onBack={props.onClose}
          />
        ) : (
          <SignUpHeader
            onPress={props.onClose}
            logoUrl={brand?.logoPath}
            style={header(insets)}
          />
        )}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: ProvinceView) => item.key}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

export default ProvinceModal;
