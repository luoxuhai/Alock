import { useEffect } from 'react';
import { StatusBar, ViewStyle, Linking, Share } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from '@/navigators';
import { ExitButton, ListCell, ListSection, SafeAreaScrollView } from '@/components';
import { i18n, SupportedLanguage, t } from '@/locales';
import Config from '@/config';
import { Application } from '@/utils';
import { AppPromoteSection } from './components/AppPromoteSection';
import { SecuritySection } from './components/SecuritySection';
import { AgreementSection } from './components/AgreementSection';
import { ContactSection } from './components/ContactSection';
import { DonateSection } from './components/DonateSection';

export const SettingsScreen = observer<NativeStackScreenProps<AppStackParamList, 'Settings'>>(
  (props) => {
    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => <ExitButton onPress={props.navigation.goBack} />,
      });
    }, []);

    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaScrollView contentContainerStyle={$contentContainer}>
          <DonateSection />

          <ListSection>
            <ListCell
              text={t('settingsScreen.version')}
              rightIcon={null}
              noTouchableHighlight
              RightAccessory={`${Application.version}(${Application.buildNumber})`}
            />
            <ListCell
              text={t('settingsScreen.goodReview')}
              onPress={() => {
                Linking.openURL(
                  `https://apps.apple.com/app/apple-store/id${Config.appId}?action=write-review`,
                );
              }}
            />
            <ListCell
              text={t('settingsScreen.share')}
              bottomSeparator={false}
              onPress={() => {
                Share.share({
                  url:
                    i18n.language === SupportedLanguage.ZH
                      ? Config.appStoreUrl.cn
                      : Config.appStoreUrl.global,
                });
              }}
            />
          </ListSection>
          <SecuritySection />
          <AgreementSection />
          <ContactSection />
          <AppPromoteSection />
        </SafeAreaScrollView>
      </>
    );
  },
);

const $contentContainer: ViewStyle = {
  paddingTop: 20,
  paddingHorizontal: 20,
};
