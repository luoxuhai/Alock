import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  PlatformColor,
  useColorScheme,
  StyleProp,
} from 'react-native';

import { VibrancyView } from '@react-native-community/blur';
import { SFSymbol } from 'react-native-sfsymbols';
import { observer } from 'mobx-react-lite';

interface BottomButtonProps {
  style?: StyleProp<ViewStyle>;
  iconName: string;
  onPress: () => void;
}

export const BottomButtonHeight = 50;

export const BottomButton = observer((props: BottomButtonProps) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <TouchableOpacity style={[$container, props.style]} activeOpacity={0.5} onPress={props.onPress}>
      <VibrancyView
        style={StyleSheet.absoluteFill}
        blurType={isDark ? 'chromeMaterialDark' : 'chromeMaterialLight'}
        blurAmount={50}
      />
      <SFSymbol name={props.iconName} size={24} color={PlatformColor('systemGray')} />
    </TouchableOpacity>
  );
});

const $container: ViewStyle = {
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  width: 86,
  height: BottomButtonHeight,
  overflow: 'hidden',
};
