import React, { useCallback, useMemo } from "react";
import { FlatList, Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";

import { AccountModalPayload } from "../../../state";
import { AppString } from "../../../resources";

import AppText from "../AppText";
import { AppButton } from "../AppButton";
import { styles, cancelBtn, cancelBtnWrapper } from "./styles";

interface Props {
  visible: boolean;
  data: Array<AccountModalPayload>;
  onCancel: () => void;
  onChange: (value: AccountModalPayload) => void;
  message: string;
}

const ChangeUserModal = (props: Props) => {
  const insents = useSafeAreaInsets();

  const snapPoints = useMemo(() => [-1, 265 + insents.bottom], []);
  const handleSheetChanges = useCallback((index: number) => {
    if (!index) {
      props.onCancel();
    }
  }, []);

  return (
    <Modal
      presentationStyle="overFullScreen"
      onRequestClose={props.onCancel}
      visible={props.visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.modalBg}>
        <BottomSheet
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.content}>
            <AppText fontType="subheading_1">{props.message}</AppText>
            <FlatList
              data={props.data}
              renderItem={({ item }) => (
                <Pressable onPress={props.onChange.bind(this, item)}>
                  <AppText fontType="paragraph_1" style={styles.listItem}>
                    {item.value}
                  </AppText>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatList}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={cancelBtnWrapper(insents)}>
            <AppButton
              title={AppString.get().cancel}
              onPress={props.onCancel}
              styleMode="text"
              titleStyle={styles.button}
              style={cancelBtn(insents)}
            />
          </View>
        </BottomSheet>
      </View>
    </Modal>
  );
};

export default ChangeUserModal;
