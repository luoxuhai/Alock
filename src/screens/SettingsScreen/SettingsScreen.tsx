import { useEffect } from 'react';
import { PlatformColor, StatusBar, ViewStyle, Linking, useColorScheme } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, TextButton } from '@/components';
import { t } from '@/locales';
import Config from '@/config';
import { Application } from '@/utils';
import { AppPromoteSection } from './components/AppPromoteSection';
import { AdvancedSection } from './components/AdvancedSection';
import { AgreementSection } from './components/AgreementSection';
import { ContactSection } from './components/ContactSection';
import { DonateSection } from './components/DonateSection';

export const SettingsScreen = observer<NativeStackScreenProps<AppStackParamList, 'Settings'>>(
  (props) => {
    const isDark = useColorScheme() === 'dark';

    useEffect(() => {
      props.navigation.setOptions({
        headerLeft: () => <TextButton text={t('common.close')} onPress={props.navigation.goBack} />,
      });
    }, []);

    return (
      <>
        <StatusBar barStyle="light-content" hidden={false} animated />
        <SafeAreaScrollView
          style={{
            backgroundColor: isDark
              ? PlatformColor('systemBackground')
              : PlatformColor('secondarySystemBackground'),
          }}
          contentContainerStyle={$contentContainer}
        >
          <DonateSection />

          <ListSection>
            <ListCell
              text={t('settingsScreen.version')}
              rightIcon={null}
              RightAccessory={`${Application.version}(${Application.buildNumber})`}
            />
            <ListCell
              text={t('settingsScreen.goodReview')}
              bottomSeparator={false}
              onPress={() => {
                Linking.openURL(
                  `https://apps.apple.com/app/apple-store/id${Config.appId}?action=write-review`,
                );
              }}
            />
          </ListSection>
          <AdvancedSection />
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
