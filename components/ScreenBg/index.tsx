import React from "react";
import { useDimensions } from "@react-native-community/hooks";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LogoSvg, Colors, Margins } from "../../../resources";

const FIRST_LOGO_SIZE = 140;
const SECOND_LOGO_SIZE = 80;
const THIRD_LOGO_SIZE = 40;
const FOURTH_LOGO_SIZE = 24;
const LOGO_OPACITY = 0.12;

const logoDecorStyle = (top: number, left: number): ViewStyle => ({
  position: "absolute",
  left,
  top
});

const ScreenBg = () => {
  const d = useDimensions();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Svg
        height={d.screen.height}
        width={d.screen.width}
        style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="1" stopColor={Colors.accentBlue} stopOpacity="1" />
            <Stop
              offset="0"
              stopColor={Colors.accentTurquoise}
              stopOpacity="1"
            />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={d.screen.width}
          height={d.screen.height}
          fill="url(#grad)"
        />
      </Svg>

      <LogoSvg
        style={logoDecorStyle(insets.top, -(FIRST_LOGO_SIZE / 3))}
        size={FIRST_LOGO_SIZE}
        opacity={LOGO_OPACITY}
        color={Colors.white}
      />
      <LogoSvg
        style={logoDecorStyle(0, d.screen.width / 3)}
        size={SECOND_LOGO_SIZE}
        opacity={LOGO_OPACITY}
        color={Colors.white}
      />
      <LogoSvg
        style={logoDecorStyle(
          insets.top + Margins.marginDefault,
          (d.screen.width / 3) * 2 - THIRD_LOGO_SIZE / 2
        )}
        size={THIRD_LOGO_SIZE}
        opacity={LOGO_OPACITY}
        color={Colors.white}
      />
      <LogoSvg
        style={logoDecorStyle(
          insets.top + Margins.marginSmall,
          d.screen.width - FOURTH_LOGO_SIZE - Margins.marginBig
        )}
        size={FOURTH_LOGO_SIZE}
        opacity={LOGO_OPACITY}
        color={Colors.white}
      />
    </>
  );
};

export default ScreenBg;
