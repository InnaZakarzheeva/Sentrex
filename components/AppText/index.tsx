import React, { PropsWithChildren } from "react";
import { Platform, Text, TextProps, TextStyle } from "react-native";
import _ from "lodash";
import { Colors } from "../../../resources";

export type FontType =
  | "caption"
  | "label"
  | "paragraph_2"
  | "paragraph_1"
  | "subheading_2"
  | "subheading_1"
  | "headline_3"
  | "headline_2"
  | "headline_1";

interface Props extends TextProps {
  fontType: FontType;
  textColor?: Colors;
}

// Seems iOS renders SourceSansPro incorrectly. Need to check also android.
// The fontSize when using SourceSansPro is smaller then it should be.

const styleByFontType = (type: FontType): TextStyle => {
  switch (type) {
    case "caption":
      return {
        fontSize: 12,
        fontFamily: Platform.select({ android: "SourceSansPro-SemiBold" }),
        fontWeight: Platform.select({ ios: "600" })
      };
    case "label":
      return {
        fontSize: 14,
        fontFamily: Platform.select({ android: "SourceSansPro-SemiBold" }),
        fontWeight: Platform.select({ ios: "600" })
      };
    case "paragraph_2":
      return {
        fontSize: 16,
        fontFamily: Platform.select({ android: "SourceSansPro-Regular" }),
        fontWeight: Platform.select({ ios: "400" })
      };
    case "paragraph_1":
      return {
        fontSize: 18,
        fontFamily: Platform.select({ android: "SourceSansPro-Regular" }),
        fontWeight: Platform.select({ ios: "400" })
      };
    case "subheading_2":
      return {
        fontSize: 16,
        fontFamily: Platform.select({ android: "SourceSansPro-Bold" }),
        fontWeight: Platform.select({ ios: "600" })
      };
    case "subheading_1":
      return {
        fontSize: 18,
        fontFamily: Platform.select({ android: "SourceSansPro-Bold" }),
        fontWeight: Platform.select({ ios: "600" })
      };
    case "headline_3":
      return {
        fontSize: 18,
        fontFamily: Platform.select({ android: "SourceSansPro-Bold" }),
        fontWeight: Platform.select({ ios: "700" })
      };
    case "headline_2":
      return {
        fontSize: 21,
        fontFamily: Platform.select({ android: "SourceSansPro-Bold" }),
        fontWeight: Platform.select({ ios: "700" })
      };
    case "headline_1":
      return {
        fontSize: 24,
        fontFamily: Platform.select({ android: "SourceSansPro-Bold" }),
        fontWeight: Platform.select({ ios: "700" })
      };
    default:
      return {
        fontSize: 16,
        fontFamily: Platform.select({ android: "SourceSansPro-Regular" }),
        fontWeight: Platform.select({ ios: "400" })
      };
  }
};

const AppText = (props: PropsWithChildren<Props>) => {
  const finalColor = props.textColor || Colors.primaryTextDark;
  const finalStyle = [
    styleByFontType(props.fontType),
    { color: finalColor },
    props.style
  ];

  return <Text style={finalStyle}>{props.children}</Text>;
};

export default AppText;
