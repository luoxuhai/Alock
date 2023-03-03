import { Switch } from 'react-native';
import { observer } from 'mobx-react-lite';

import { ListCell, ListSection } from '@/components';
import { t } from '@/locales';
import { useStores } from '@/models';

export const AdvancedSection = observer(() => {
  const { settingsStore } = useStores();

  return (
    <ListSection headerText={t('settingsScreen.security.title')}>
      <ListCell
        text={t('settingsScreen.security.lock')}
        rightIcon={null}
        RightAccessory={
          <Switch
            value={settingsStore.appLockEnabled}
            onValueChange={(value) => {
              settingsStore.setAppLockEnabled(value);
            }}
          />
        }
      />
    </ListSection>
  );
});
