import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomButton } from './BottomButton';
import { Device } from '@/utils';

interface BottomActionBarProps {
  onPressSettings: () => void;
}

export const BottomActionBarPaddingBottom = Device.isPad ? 50 : 20;

export function BottomActionBar(props: BottomActionBarProps) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[$bottomContainer, { bottom: safeAreaInsets.bottom }]}>
      <BottomButton
        iconName="gearshape"
        onPress={() => {
          props.onPressSettings();
        }}
      />
    </View>
  );
}

const $bottomContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingBottom: BottomActionBarPaddingBottom,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 26,
};
