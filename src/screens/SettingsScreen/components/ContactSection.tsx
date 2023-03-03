import { Linking } from 'react-native';
import Mailer from 'react-native-mail';

import { ListCell, ListSection } from '@/components';
import { t } from '@/locales';
import Config from '@/config';
import { Application, Device } from '@/utils';

function openDeveloperEmail() {
  Mailer.mail(
    {
      recipients: [Config.email],
      body: `


           Device: ${Device.modelName}
           iOS Version: ${Device.version}
           App Version: ${Application.version}(${Application.buildNumber})
    `,
    },
    (err) => {
      if (!err) {
        return;
      }
      Linking.openURL(`mailto:${Config.email}`);
    },
  );
}

export function ContactSection() {
  return (
    <ListSection>
      <ListCell
        text={t('settingsScreen.connect')}
        bottomSeparator={false}
        RightAccessory={Config.email}
        onPress={openDeveloperEmail}
      />
    </ListSection>
  );
}
