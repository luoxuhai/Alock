import { useColorScheme, PlatformColor } from 'react-native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { HomeScreen, SettingsScreen, AppLockScreen } from '@/screens';
import { t } from '@/locales';

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

  return (
    <Stack.Navigator
      screenOptions={{
        headerBlurEffect: isDark ? 'systemMaterialDark' : 'systemMaterialLight',
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'modal',
          title: t('settingsScreen.title'),
        }}
      />

      <Stack.Screen
        name="AppLock"
        component={AppLockScreen}
        options={{
          headerShown: false,
          animation: 'fade',
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
    <NavigationContainer {...props} theme={theme as unknown as Theme}>
      <AppStack />
    </NavigationContainer>
  );
});
