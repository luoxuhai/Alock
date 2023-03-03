import { useEffect } from 'react';
import { PlatformColor, Text, TextStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';

import { AppStackParamList } from '@/navigators';
import { t } from '@/locales';
import { SafeAreaScrollView } from '@/components';
import { human } from 'react-native-typography';

export const HomeScreen = observer((_: NativeStackScreenProps<AppStackParamList, 'Home'>) => {
  return (
    <SafeAreaScrollView>
      <Text style={[human.title1, $text]}>{t('homeScreen.hello')}</Text>
    </SafeAreaScrollView>
  );
});

const $text: TextStyle = {
  textAlign: 'center',
  marginTop: 100,
  color: PlatformColor('label'),
};
