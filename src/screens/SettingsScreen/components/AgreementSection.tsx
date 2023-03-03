import { ListSection, ListCell } from '@/components';
import { i18n, SupportedLanguage, t } from '@/locales';
import { openLinkInAppBrowser } from '@/utils';
import Config from '@/config';

export function openUserAgreement() {
  openLinkInAppBrowser(
    i18n.language === SupportedLanguage.ZH
      ? Config.userAgreement.zh_cn
      : Config.userAgreement.en_us,
  );
}

export function openPrivacyPolicy() {
  openLinkInAppBrowser(
    i18n.language === SupportedLanguage.ZH
      ? Config.privacyPolicy.zh_cn
      : Config.privacyPolicy.en_us,
  );
}

export function AgreementSection() {
  return (
    <ListSection headerText={t('settingsScreen.agreement')}>
      <ListCell text={t('settingsScreen.privacyPolicy')} onPress={openPrivacyPolicy} />
      <ListCell
        text={t('settingsScreen.userAgreement')}
        bottomSeparator={false}
        onPress={openUserAgreement}
      />
    </ListSection>
  );
}
