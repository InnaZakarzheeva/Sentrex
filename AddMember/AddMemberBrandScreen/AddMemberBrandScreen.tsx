import React, { useEffect, useState } from "react";
import { AppString } from "../../../../resources";
import { View, FlatList } from "react-native";
import {
  AppButton,
  AppText,
  ProfileHeader,
  ScreenContainer,
  SearchInput,
  BrandItem,
  BlockedLoader,
  RequestStatusModal
} from "../../../components";
import { styles } from "./styles";
import Props from "./types";
import _ from "lodash";
import { BrandView } from "../../../../state";
import { useKeyboard } from "@react-native-community/hooks";
import { useRequestStatus } from "../../hooks";

const AddMemberBrandScreen = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [chosenBrand, setBrand] = useState("");
  const keyboard = useKeyboard();

  const onSuccess = () => {
    props.hideError();
    props.navigation.navigate("AddMemberScreen");
  };

  const errorVisible = useRequestStatus(props.requestStatus, onSuccess);

  useEffect(() => {
    props.getBrands();
  }, []);

  const onChangeSearchValue = (value: string) => {
    setSearchValue(value);
    props.searchBrand(value);
  };

  const renderBrand = ({ item }: { item: BrandView }) => {
    const handlePress = () => {
      setBrand(item.name);
    };
    return (
      <BrandItem
        logoUri={item.logoPath}
        isSelected={chosenBrand === item.name}
        onPress={handlePress}
      />
    );
  };

  const separator = () => <View style={styles.separator} />;

  const onContinue = () => {
    props.addBrand(chosenBrand);
    props.getBrandSettings(chosenBrand);
  };

  return (
    <ScreenContainer style={styles.root}>
      <ProfileHeader
        title={AppString.get().addMembers}
        childRight={<AppText fontType="paragraph_1">1/5</AppText>}
      />
      <View style={styles.searchContainer}>
        <AppText fontType="subheading_1">{AppString.get().selectBrand}</AppText>
        <SearchInput
          value={searchValue}
          onChangeText={onChangeSearchValue}
          withClear={!_.isEmpty(searchValue)}
        />
      </View>

      <FlatList
        style={styles.flatList}
        data={props.brands}
        renderItem={renderBrand}
        keyExtractor={(item: BrandView) => item.name}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={separator}
      />
      {!keyboard.keyboardShown && (
        <AppButton
          title={AppString.get().select}
          onPress={onContinue}
          disabled={_.isEmpty(chosenBrand)}
          style={styles.continueBtn}
        />
      )}
      <BlockedLoader visible={props.requestStatus === "pending"} />
      {props.error && (
        <RequestStatusModal
          visible={errorVisible}
          message={props.error.message}
          onActionPress={props.hideError}
        />
      )}
    </ScreenContainer>
  );
};

export default AddMemberBrandScreen;
