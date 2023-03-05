import './locales';

import React, { useEffect } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';

import { AppNavigator, RootNavigation } from './navigators';
import { useInitialRootStore, useStores } from '@/models';
import { getBlockedApplicationsCount } from './lib/ScreenTime';
import { LocalAuth } from './utils';
import { useAppState, useUpdateEffect } from './utils/hooks';

const App = observer(() => {
  const { globalStore, settingsStore } = useStores();
  const appState = useAppState();

  const { rehydrated } = useInitialRootStore();

  useEffect(() => {
    LocalAuth.shared.getBiometryType().then(globalStore.setBiometricsType);
    getBlockedApplicationsCount().then(settingsStore.setSelectedAppCount);
  }, []);

  useUpdateEffect(() => {
    if (appState === 'background' && settingsStore.appLockEnabled) {
      globalStore.lock();
    }
  }, [appState, settingsStore.appLockEnabled]);

  useUpdateEffect(() => {
    if (globalStore.isLocked) {
      RootNavigation.navigate('AppLock');
    }
  }, [globalStore.isLocked]);

  const isReay = rehydrated;

  if (!isReay) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  );
});

export default App;
