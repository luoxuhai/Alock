import React from 'react';
import { requireNativeComponent, ViewStyle } from 'react-native';

const ComponentName = 'RNFamilyActivityPicker';

interface FamilyActivityPickerProps {
  headerText?: string;
  footerText?: string;
  style?: ViewStyle;
  onActivityChange?: (appTokensCount: number) => void;
}

const Component = requireNativeComponent(ComponentName);

export function FamilyActivityPicker({ onActivityChange, ...props }: FamilyActivityPickerProps) {
  return (
    <Component
      {...props}
      onActivityChange={(event) => onActivityChange(event.nativeEvent?.appTokensCount ?? 0)}
    />
  );
}
