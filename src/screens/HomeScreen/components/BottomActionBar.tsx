import { Share, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { i18n, SupportedLanguage } from '@/locales';
import { BottomButton } from './BottomButton';
import { Device } from '@/utils';
import Config from '@/config';

interface BottomActionBarProps {
  onPressSettings: () => void;
}

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
      <BottomButton
        iconName="square.and.arrow.up"
        onPress={() => {
          Share.share({
            url:
              i18n.language === SupportedLanguage.ZH
                ? Config.appStoreUrl.cn
                : Config.appStoreUrl.global,
          });
        }}
      />
    </View>
  );
}

const $bottomContainer: ViewStyle = {
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  paddingBottom: Device.isPad ? 50 : 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 26,
};
