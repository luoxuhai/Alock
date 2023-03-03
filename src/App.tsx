import './locales';

import React, { useEffect } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';

import { AppNavigator, useNavigationPersistence, NAVIGATION_PERSISTENCE_KEY } from './navigators';
import * as storage from '@/utils/storage';
import { useInitialRootStore } from '@/models';
import { requestAuthorization } from './lib/ScreenTime';

const App = observer(() => {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const { rehydrated } = useInitialRootStore();

  useEffect(() => {
    requestAuthorization();
  }, []);

  const isReay = rehydrated && isNavigationStateRestored;

  if (!isReay) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator
        {...(__DEV__
          ? {
              initialState: initialNavigationState,
              onStateChange: onNavigationStateChange,
            }
          : {})}
      />
    </SafeAreaProvider>
  );
});

export default App;
