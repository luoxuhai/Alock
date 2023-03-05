import './locales';

import React, { useEffect } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';

import {
  AppNavigator,
  useNavigationPersistence,
  NAVIGATION_PERSISTENCE_KEY,
  RootNavigation,
} from './navigators';
import * as storage from '@/utils/storage';
import { useInitialRootStore, useStores } from '@/models';
import { getBlockedApplicationsCount, requestAuthorization } from './lib/ScreenTime';
import { LocalAuth } from './utils';
import { useAppState } from './utils/hooks';

const App = observer(() => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  const { globalStore, settingsStore } = useStores();
  const appState = useAppState();

  const { rehydrated } = useInitialRootStore();

  useEffect(() => {
    requestAuthorization();
    LocalAuth.shared.getBiometryType().then(globalStore.setBiometricsType);
    getBlockedApplicationsCount().then(settingsStore.setSelectedAppCount);
  }, []);

  useEffect(() => {
    if (appState === 'background' && settingsStore.appLockEnabled) {
      globalStore.lock();
    }
  }, [appState, settingsStore.appLockEnabled]);

  useEffect(() => {
    if (globalStore.isLocked) {
      RootNavigation.navigate('AppLock');
    }
  }, [globalStore.isLocked]);

  const isReay = rehydrated && isNavigationStateRestored;

  if (!isReay) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator
      // {...(__DEV__
      //   ? {
      //       initialState: initialNavigationState,
      //       onStateChange: onNavigationStateChange,
      //     }
      //   : {})}
      />
    </SafeAreaProvider>
  );
});

export default App;
