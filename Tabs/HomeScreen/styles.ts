import { StyleSheet } from "react-native";
import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.grayLight,
    paddingHorizontal: Margins.marginDefault
  },
  label: {
    marginBottom: Margins.marginDefault
  },
  welcomeBlock: {
    width: "100%",
    borderRadius: 12,
    height: 64,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: Margins.marginMiddle,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6
  },
  welcomeTitle: {
    fontSize: 24,
    top: 12,
    marginRight: Margins.marginDefault
  },
  welcomeLogo: {
    position: "absolute",
    right: 0,
    top: 0
  },
  financialBlock: {
    width: 106,
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Margins.marginSmall,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6
  },
  financialLabel: {
    textAlign: "center",
    marginTop: Margins.marginSmall
  },
  tipWrapper: {
    width: "100%",
    height: 88,
    backgroundColor: Colors.white,
    borderRadius: 8,
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6
  },
  tipsText: {
    width: 180,
    textAlign: "center"
  }
});
