import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets, EdgeInsets } from "react-native-safe-area-context";
import _ from "lodash";

import { Props } from "./types";

const ScreenContainer = (props: PropsWithChildren<Props>) => {
  const insets: EdgeInsets = useSafeAreaInsets();

  const contentStyle = () => {
    return [
      {
        flex: 1,
        paddingBottom: !_.isNil(props.withBottomInset)
          ? props.withBottomInset
            ? insets.bottom
            : 0
          : insets.bottom,
        paddingTop: !_.isNil(props.withTopInset)
          ? props.withTopInset
            ? insets.top
            : 0
          : insets.top,
        backgroundColor: props.backgroundColor
      },
      props.style
    ];
  };

  return <View style={contentStyle()}>{props.children}</View>;
};

export default ScreenContainer;
