import { Switch } from 'react-native';
import { observer } from 'mobx-react-lite';

import { ListCell, ListSection } from '@/components';
import { t } from '@/locales';
import { useStores } from '@/models';
import { BiometryType } from '@/utils';

const biometricsTypeMap = {
  [BiometryType.FaceID]: t('appLockScreen.faceID'),
  [BiometryType.TouchID]: t('appLockScreen.touchID'),
};

export const SecuritySection = observer(() => {
  const { settingsStore, globalStore } = useStores();

  if (!globalStore.biometricsType || globalStore.biometricsType === BiometryType.Unknown) {
    return null;
  }

  return (
    <ListSection
      headerText={t('settingsScreen.security.title')}
      footerText={t('settingsScreen.security.tip')}
    >
      <ListCell
        text={t('settingsScreen.security.lock', {
          type: biometricsTypeMap[globalStore.biometricsType],
        })}
        rightIcon={null}
        bottomSeparator={false}
        RightAccessory={
          <Switch
            value={settingsStore.appLockEnabled}
            onValueChange={settingsStore.setAppLockEnabled}
          />
        }
      />
    </ListSection>
  );
});
