import { PlatformColor, Text, TextStyle, View, ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackParamList } from '@/navigators';
import { t } from '@/locales';
import { human } from 'react-native-typography';
import { BottomActionBar } from './components/BottomActionBar';

export const HomeScreen = observer((props: NativeStackScreenProps<AppStackParamList, 'Home'>) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={$container}>
      <Text style={[human.title1, $text]}>{t('homeScreen.hello')}</Text>

      <BottomActionBar
        onPressSettings={() => {
          props.navigation.navigate('Settings');
        }}
      />
    </View>
  );
});

const $container: ViewStyle = {
  flex: 1,
};

const $text: TextStyle = {
  textAlign: 'center',
  marginTop: 100,
  color: PlatformColor('label'),
};
