import React from 'react';
import { View, ColorValue, ViewStyle, StyleProp } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

interface SettingsIconProps {
  backgroundColor: ColorValue;
  color?: ColorValue;
  backgroundSize?: number;
  iconSize?: number;
  systemName?: string;
  radius?: number;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SettingsIcon(props: SettingsIconProps) {
  const {
    backgroundSize = 28,
    iconSize = 20,
    radius = 6,
    systemName,
    icon,
    color = '#FFF',
  } = props;

  return (
    <View
      style={[
        $container,
        {
          backgroundColor: props.backgroundColor,
          width: backgroundSize,
          height: backgroundSize,
          borderRadius: radius,
        },
        props.style,
      ]}
    >
      {icon ||
        (systemName && (
          <SFSymbol
            name={systemName}
            style={{
              width: iconSize,
              height: iconSize,
            }}
            color={color}
          />
        ))}
    </View>
  );
}

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
