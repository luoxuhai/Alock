import React, { ReactElement, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  TextProps,
  PlatformColor,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import Animated, { FadeIn } from 'react-native-reanimated';
import { human } from 'react-native-typography';

import { SFSymbol } from 'react-native-sfsymbols';
import { useColorScheme } from 'react-native';

export interface ListCellProps extends TouchableHighlightProps {
  topSeparator?: boolean;
  bottomSeparator?: boolean;
  text?: TextProps['children'];
  textStyle?: TextProps['style'];
  children?: React.ReactElement | React.ReactElement[];
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  rightIcon?: ReactElement | null;
  visible?: boolean;
  RightAccessory?: ReactElement | string;
}

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

export function ListCell(props: ListCellProps) {
  const {
    bottomSeparator = true,
    children,
    RightAccessory,
    rightIcon,
    style,
    text,
    textStyle,
    visible = true,
    ...touchableOpacityProps
  } = props;
  const isDark = useColorScheme() === 'dark';
  const [isPressIn, setIsPressIn] = useState(false);

  const $containerStyles = [
    $container,
    {
      backgroundColor: isDark
        ? PlatformColor('secondarySystemBackground')
        : PlatformColor('systemBackground'),
    },
    style,
  ];
  const $contentStyles = [
    $content,
    bottomSeparator &&
      !isPressIn && {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: PlatformColor('systemGray4'),
      },
  ];

  return visible ? (
    <AnimatedTouchableHighlight
      {...touchableOpacityProps}
      entering={FadeIn.duration(150)}
      style={$containerStyles}
      underlayColor={PlatformColor('systemGray5')}
      onPressIn={(event) => {
        setIsPressIn(true);
        touchableOpacityProps.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setIsPressIn(false);
        touchableOpacityProps.onPressOut?.(event);
      }}
    >
      <>
        {children || (
          <>
            <View style={$contentStyles}>
              <Text
                style={[
                  $text,
                  {
                    color: PlatformColor('label'),
                  },
                  textStyle,
                ]}
              >
                {text}
              </Text>

              <View style={$rightContent}>
                {RightAccessory ? (
                  <View style={$rightAccessory}>
                    {typeof RightAccessory === 'string' ? (
                      <ExtraText text={RightAccessory} />
                    ) : (
                      RightAccessory
                    )}
                  </View>
                ) : null}
                {rightIcon !== null &&
                  (rightIcon || (
                    <SFSymbol
                      style={{
                        width: 18,
                        height: 18,
                      }}
                      name="chevron.right"
                      weight="medium"
                      color={PlatformColor('opaqueSeparator')}
                    />
                  ))}
              </View>
            </View>
          </>
        )}
      </>
    </AnimatedTouchableHighlight>
  ) : null;
}

const ExtraText = observer(({ text }: { text: string }) => {
  return <Text style={[human.subhead, { color: PlatformColor('secondaryLabel') }]}>{text}</Text>;
});

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: 44,
};

const $content: ViewStyle = {
  alignSelf: 'stretch',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: 16,
};

const $text: TextStyle = {
  ...StyleSheet.flatten(human.body),
  paddingVertical: 4,
  flex: 1,
};

const $rightContent: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: 12,
};

const $rightAccessory: ViewStyle = {
  marginRight: 4,
};
