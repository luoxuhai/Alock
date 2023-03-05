import React from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  ActivityIndicator,
  PlatformColor,
} from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

interface ExitButtonProps extends TouchableOpacityProps {
  loading?: boolean;
}

export function ExitButton(props: ExitButtonProps) {
  return (
    <TouchableOpacity
      style={[
        $container,
        {
          backgroundColor: PlatformColor('tertiarySystemFill'),
        },
      ]}
      activeOpacity={0.8}
      {...props}
    >
      {props.loading ? (
        <ActivityIndicator />
      ) : (
        <SFSymbol name="xmark" size={15} weight="bold" color={PlatformColor('secondaryLabel')} />
      )}
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  width: 30,
  height: 30,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
};
