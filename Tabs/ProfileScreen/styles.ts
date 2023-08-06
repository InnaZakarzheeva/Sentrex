import { StyleSheet } from "react-native";

import { Colors, Margins } from "../../../../resources";

import { ITEM_HEIGHT } from "./component/MenuItem";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  space: {
    height: ITEM_HEIGHT,
    justifyContent: "center"
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.icon,
    opacity: 0.5
  },
  header: {
    paddingHorizontal: Margins.marginDefault,
    marginBottom: Margins.marginSmall
  },
  contentWrapper: {
    paddingBottom: Margins.marginDefault
  }
});
