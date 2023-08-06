import { StyleSheet } from "react-native";
import { Colors, Margins } from "../../../../resources";

export const styles = StyleSheet.create({
  root: { backgroundColor: Colors.white },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: Margins.marginBiggest,
    marginTop: Margins.marginSmall
  },
  label: {
    marginTop: Margins.marginDefault,
    marginBottom: Margins.marginMiddle
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
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.inputBorder
  },
  uploadLabel: {
    color: Colors.accentBlue,
    marginTop: Margins.marginMicro,
    textAlign: "center"
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
  button: {
    marginHorizontal: Margins.marginBiggest
  },
  imagesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
});
