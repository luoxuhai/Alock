import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  PlatformColor,
  Switch,
  TextStyle,
  Text,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppStackParamList } from '@/navigators';
import { t } from '@/locales';
import { BottomActionBar, BottomActionBarPaddingBottom } from './components/BottomActionBar';
import { ListCell, ListSection, SettingsIcon } from '@/components';
import {
  clearBlockedApplications,
  FamilyActivityPicker,
  requestAuthorization,
  isApproved,
} from '@/lib/ScreenTime';
import { useStores } from '@/models';
import { color } from '@/theme';
import { human } from 'react-native-typography';
import { BottomButtonHeight } from './components/BottomButton';
import { useAppState, useUpdateEffect } from '@/utils/hooks';

export const HomeScreen = observer((props: NativeStackScreenProps<AppStackParamList, 'Home'>) => {
  const { settingsStore } = useStores();
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const appState = useAppState();

  useEffect(() => {
    if (!settingsStore.hideAppEnabled) {
      clearBlockedApplications();
    }

    requestAuthorization().then(() => setApproved(true));

    const timer = setTimeout(() => {
      setLoading(true);
    }, 200);

    isApproved()
      .then(setApproved)
      .finally(() => {
        clearTimeout(timer);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      isApproved().then(setApproved);
    }
  }, [appState]);

  useUpdateEffect(() => {
    if (!approved) {
      settingsStore.setHideAppEnabled(false);
    }
  }, [approved]);

  async function alertPermission() {
    settingsStore.setHideAppEnabled(false);

    try {
      await requestAuthorization();
      setApproved(true);
    } catch {
      setApproved(false);
      Alert.alert(
        t('homeScreen.applicationPicker.permission.title'),
        t('homeScreen.applicationPicker.permission.message'),
        [
          {
            text: t('common.ok'),
            style: 'default',
          },
        ],
      );
    }
  }

  const handleHideAppChange = useCallback(
    async (value: boolean) => {
      if (await isApproved()) {
        settingsStore.setHideAppEnabled(value);
      } else {
        alertPermission();
      }
    },
    [alertPermission],
  );

  const handleLockAppChange = useCallback(
    async (value: boolean) => {
      if (await isApproved()) {
        settingsStore.setLockAppEnabled(value);
      } else {
        alertPermission();
      }
    },
    [alertPermission],
  );

  return (
    <SafeAreaView style={[$container]} edges={['bottom', 'left', 'right']}>
      <ListSection>
        <ListCell
          text={t('homeScreen.hideAppEnabled')}
          leftIcon={
            <SettingsIcon
              systemName="eye.slash.fill"
              backgroundColor={PlatformColor('systemPurple')}
            />
          }
          RightAccessory={
            <Switch value={settingsStore.hideAppEnabled} onValueChange={handleHideAppChange} />
          }
          rightIcon={null}
        />
        <ListCell
          text={t('homeScreen.lockAppEnabled')}
          leftIcon={
            <SettingsIcon systemName="lock" backgroundColor={PlatformColor('systemOrange')} />
          }
          RightAccessory={
            <Switch value={settingsStore.lockAppEnabled} onValueChange={handleLockAppChange} />
          }
          rightIcon={null}
        />
        <ListCell
          text={t('homeScreen.count')}
          RightAccessory={<Text style={$count}>{settingsStore.selectedAppCount}</Text>}
          rightIcon={null}
          leftIcon={<SettingsIcon systemName="apps.iphone" backgroundColor={color.primary} />}
          noTouchableHighlight
          bottomSeparator={false}
        />
      </ListSection>
      <ListSection headerText={t('homeScreen.applicationPicker.title')} style={$appPickerSection}>
        {loading ? (
          <ActivityIndicator />
        ) : approved ? (
          <ListCell style={[$appPickerCell]}>
            <FamilyActivityPicker
              style={$familyActivityPicker}
              onActivityChange={settingsStore.setSelectedAppCount}
            />
          </ListCell>
        ) : (
          <ListCell
            text={t('homeScreen.applicationPicker.permission.button')}
            textStyle={{
              color: PlatformColor('systemBlue'),
            }}
            rightIcon={null}
            bottomSeparator={false}
            onPress={alertPermission}
          />
        )}
      </ListSection>

      <BottomActionBar
        onPressSettings={() => {
          props.navigation.navigate('Settings');
        }}
      />
    </SafeAreaView>
  );
});

const $container: ViewStyle = {
  flex: 1,
  paddingTop: 20,
  paddingHorizontal: 20,
};

const $appPickerSection: ViewStyle = {
  flex: 1,
  paddingBottom: BottomActionBarPaddingBottom + BottomButtonHeight + 25,
};

const $appPickerCell: ViewStyle = {
  marginHorizontal: -20,
  height: '100%',
};

const $familyActivityPicker: ViewStyle = {
  width: '100%',
  height: '100%',
};

const $count: TextStyle = {
  ...human.bodyObject,
  color: color.primary,
  fontWeight: '500',
};
