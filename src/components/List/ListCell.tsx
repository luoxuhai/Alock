import React, { ReactElement, useCallback, useMemo, useState } from 'react';
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
  GestureResponderEvent,
  Pressable,
  useColorScheme,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import Animated, { FadeIn } from 'react-native-reanimated';
import { human } from 'react-native-typography';
import { SFSymbol } from 'react-native-sfsymbols';

export interface ListCellProps extends TouchableHighlightProps {
  topSeparator?: boolean;
  bottomSeparator?: boolean;
  text?: TextProps['children'];
  textStyle?: TextProps['style'];
  children?: React.ReactElement | React.ReactElement[];
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  rightIcon?: ReactElement | null;
  leftIcon?: ReactElement | null;
  visible?: boolean;
  noTouchableHighlight?: boolean;
  RightAccessory?: ReactElement | string;
}

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

export function ListCell(props: ListCellProps) {
  const {
    bottomSeparator = true,
    children,
    RightAccessory,
    leftIcon,
    rightIcon,
    style,
    text,
    textStyle,
    visible = true,
    noTouchableHighlight = false,
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

  const onPressIn = useCallback((event: GestureResponderEvent) => {
    setIsPressIn(true);
    touchableOpacityProps.onPressIn?.(event);
  }, []);

  const onPressOut = useCallback((event: GestureResponderEvent) => {
    setIsPressIn(false);
    touchableOpacityProps.onPressOut?.(event);
  }, []);

  if (!visible) {
    return null;
  }

  const PressableComponent = useMemo(
    () => (noTouchableHighlight ? Pressable : AnimatedTouchableHighlight),
    [noTouchableHighlight],
  );

  return (
    <PressableComponent
      {...touchableOpacityProps}
      entering={FadeIn.duration(150)}
      style={$containerStyles}
      underlayColor={PlatformColor(isDark ? 'systemGray4' : 'systemGray5')}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <>
        {children || (
          <>
            {leftIcon ? <LeftIconWrapper>{leftIcon}</LeftIconWrapper> : null}

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
                      style={$rightIcon}
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
    </PressableComponent>
  );
}

const ExtraText = observer(({ text }: { text: string }) => {
  return <Text style={[human.subhead, { color: PlatformColor('secondaryLabel') }]}>{text}</Text>;
});

function LeftIconWrapper({ children }: { children: React.ReactNode }) {
  return <View style={$leftIconWrapper}>{children}</View>;
}

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

const $leftIconWrapper: ViewStyle = {
  marginLeft: 12,
};

const $rightIcon: ViewStyle = {
  width: 18,
  height: 18,
};
