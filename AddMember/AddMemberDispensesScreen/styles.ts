import { StyleSheet } from "react-native";
import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contenWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginMiddle
  },
  label: {
    marginTop: Margins.marginSmall
  },
  uploadWrapper: {
    width: 140,
    height: 140,
    backgroundColor: Colors.lightBlue,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBlueBorder,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Margins.marginDefault,
    marginRight: 10
  },
  uploadLabel: {
    color: Colors.accentBlue,
    marginTop: Margins.marginMicro,
    textAlign: "center"
  },
  btnWrapper: { flexDirection: "row" },
  button: {
    flex: 1,
    borderRadius: 12,
    marginHorizontal: Margins.marginSmall
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.inputBorder
  },
  closeWrapper: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    borderRadius: 50,
    position: "absolute",
    top: -11,
    right: -11,
    backgroundColor: Colors.white
  },
  imagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: Margins.marginMiddle,
    paddingBottom: Margins.marginDefault
  }
});
