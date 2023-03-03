import {
  Image,
  ImageStyle,
  PlatformColor,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  Linking,
} from 'react-native';
import { human } from 'react-native-typography';
import { SFSymbol } from 'react-native-sfsymbols';

import { ListCell, ListSection } from '@/components';
import { i18n, SupportedLanguage, t } from '@/locales';

const AppIcon = require('@/assets/app-icon.png');

const appList = [
  {
    name: t('settingsScreen.recommend.appName'),
    icon: AppIcon,
    description: t('settingsScreen.recommend.desc'),
    url:
      i18n.language === SupportedLanguage.ZH
        ? 'https://apps.apple.com/cn/app/id1597534147'
        : 'https://apps.apple.com/app/id1597534147',
  },
];

export function AppPromoteSection() {
  return (
    <ListSection headerText={t('settingsScreen.recommend.title')}>
      {appList.map((app, index) => {
        const bottomSeparator = index !== appList.length - 1;
        return (
          <ListCell
            style={$recommend}
            bottomSeparator={bottomSeparator}
            onPress={() => {
              Linking.openURL(app.url);
            }}
          >
            <Image style={$appIcon} source={app.icon} />
            <View style={$body}>
              <Text style={[human.body, $appName]}>{app.name}</Text>
              <Text style={[human.subhead, $desc]}>{app.description}</Text>
            </View>
            <SFSymbol
              style={$downIcon}
              name="icloud.and.arrow.down"
              weight="medium"
              color={PlatformColor('systemBlue')}
            />
          </ListCell>
        );
      })}
    </ListSection>
  );
}

const $recommend: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 10,
};

const $appIcon: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: PlatformColor('systemGray5'),
  marginRight: 16,
};

const $appName: TextStyle = {
  color: PlatformColor('label'),
  marginBottom: 4,
};

const $desc: TextStyle = {
  color: PlatformColor('secondaryLabel'),
};

const $body: ViewStyle = {
  flex: 1,
};

const $downIcon: ViewStyle = {
  width: 30,
  height: 30,
};
