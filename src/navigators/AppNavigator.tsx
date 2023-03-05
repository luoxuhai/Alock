import { useColorScheme, PlatformColor } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { HomeScreen, SettingsScreen, AppLockScreen } from '@/screens';
import { t } from '@/locales';
import { useMemo } from 'react';
import { useStores } from '@/models';
import { color } from '@/theme';
import { navigationRef } from './helpers/navigationUtilities';

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  AppLock: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const isDark = useColorScheme() === 'dark';
  const { settingsStore } = useStores();

  const backgroundColor = useMemo(
    () => (isDark ? PlatformColor('systemBackground') : PlatformColor('secondarySystemBackground')),
    [isDark],
  );

  const initialRouteName = useMemo(
    () => (settingsStore.appLockEnabled ? 'AppLock' : 'Home'),
    [settingsStore.appLockEnabled],
  );

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerLargeTitle: true,
          title: t('common.appName'),
          headerTransparent: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor,
          },
          headerLargeTitleStyle: {
            color: color.primary,
          },
          contentStyle: {
            backgroundColor,
          },
        }}
        component={HomeScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'modal',
          title: t('settingsScreen.title'),
          headerStyle: {
            backgroundColor,
          },
          contentStyle: {
            backgroundColor,
          },
        }}
      />

      <Stack.Screen
        name="AppLock"
        component={AppLockScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          contentStyle: {
            backgroundColor: PlatformColor('systemBackground'),
          },
        }}
      />
    </Stack.Navigator>
  );
});

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const theme = {
  colors: {
    primary: PlatformColor('systemBlue'),
    text: PlatformColor('label'),
  },
};

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  return (
    <NavigationContainer ref={navigationRef} {...props} theme={theme as unknown as Theme}>
      <AppStack />
    </NavigationContainer>
  );
});
