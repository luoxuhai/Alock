import { PlatformColor, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { FullWindowOverlay } from 'react-native-screens';

import { AppStackParamList } from '@/navigators';
import { t } from '@/locales';
import { SFSymbol } from 'react-native-sfsymbols';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStores } from '@/models';
import { BiometryType, LocalAuth } from '@/utils';
import { useCallback, useEffect } from 'react';

export const AppLockScreen = observer(
  (props: NativeStackScreenProps<AppStackParamList, 'AppLock'>) => {
    const { globalStore } = useStores();

    useEffect(() => {
      LocalAuth.shared.getBiometryType().then((type) => {
        if (type === BiometryType.Unknown) {
          globalStore.unlock();
          return;
        }

        setTimeout(() => {
          handleRequestLocalAuth();
        }, 600);
      });
    }, []);

    useEffect(() => {
      if (!globalStore.isLocked) {
        if (props.navigation.canGoBack()) {
          props.navigation.goBack();
        } else {
          props.navigation.replace('Home');
        }
      }
    }, [globalStore.isLocked]);

    const handleRequestLocalAuth = useCallback(async () => {
      const type = await LocalAuth.shared.getBiometryType();
      if (type === BiometryType.Unknown) {
        globalStore.unlock();
        return;
      }

      const success = await LocalAuth.shared.requestAuth();
      if (success) {
        globalStore.unlock();
      }
    }, []);

    return (
      // <FullWindowOverlay style={$overlay}>
      <SafeAreaView style={$container} edges={['bottom']}>
        <TouchableOpacity onPress={handleRequestLocalAuth}>
          {globalStore.biometricsType === BiometryType.FaceID ? (
            <SFSymbol style={$biometrics} name="faceid" />
          ) : (
            <SFSymbol style={$biometrics} color={PlatformColor('systemRed')} name="touchid" />
          )}
        </TouchableOpacity>

        <Text style={$text}>{t('appLockScreen.unlockTip')}</Text>
      </SafeAreaView>
      // </FullWindowOverlay>
    );
  },
);

const $overlay: ViewStyle = {
  flex: 1,
};

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $text: TextStyle = {
  marginTop: 20,
  color: PlatformColor('secondaryLabel'),
};

const $biometrics: ViewStyle = {
  width: 52,
  height: 52,
  marginTop: 20,
};
