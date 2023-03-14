import {
  Text,
  Button,
  Image,
  View,
  TextStyle,
  ImageStyle,
  ViewStyle,
  PlatformColor,
  ActivityIndicator,
  Linking,
} from 'react-native';

import { ListSection, ListCell } from '@/components';
import { InAppPurchase } from '../helpers/InAppPurchase';
import { useCallback } from 'react';
import { human } from 'react-native-typography';
import { useAsyncMemo } from '@/utils/hooks';
import { t } from '@/locales';

const iconCoffee = require('@/assets/coffee.png');

export function DonateSection() {
  const product = useAsyncMemo(async () => {
    await InAppPurchase.shared.init();
    return await InAppPurchase.shared.getProduct();
  }, []);

  const handlePurchase = useCallback(async () => {
    await InAppPurchase.shared.init();
    await InAppPurchase.shared.requestPurchase();
  }, []);

  const handleToGithub = useCallback(() => {
    Linking.openURL('https://github.com/luoxuhai/AppLocker');
  }, []);

  return (
    <ListSection>
      <ListCell style={$container} bottomSeparator={false} onPress={handlePurchase}>
        <Image style={$icon} source={iconCoffee} />

        <View style={$textContainer}>
          <Text style={$title} adjustsFontSizeToFit numberOfLines={1}>
            {t('settingsScreen.donate.title')}
          </Text>
          <Text style={$subtitle} adjustsFontSizeToFit numberOfLines={2}>
            {t('settingsScreen.donate.subtitle')}
          </Text>
        </View>

        <View>
          {product?.localizedPrice ? (
            <Button title={product?.localizedPrice} onPress={handlePurchase} />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ListCell>
      <ListCell
        text={t('settingsScreen.openSource.title')}
        bottomSeparator={false}
        onPress={handleToGithub}
      />
    </ListSection>
  );
}

const $container: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 8,
  alignItems: 'center',
};

const $textContainer: ViewStyle = {
  marginHorizontal: 12,
  flex: 1,
};

const $title: TextStyle = {
  ...human.headlineObject,
  color: PlatformColor('label'),
};

const $subtitle: TextStyle = {
  ...human.footnoteObject,
  color: PlatformColor('secondaryLabel'),
  marginTop: 4,
};

const $icon: ImageStyle = {
  width: 50,
  height: 50,
};
