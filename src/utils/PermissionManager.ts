import { Alert } from 'react-native';
import {
  checkMultiple,
  requestMultiple,
  openSettings,
  RESULTS,
  IOSPermission,
} from 'react-native-permissions';

import { t } from '@/locales';

export class PermissionManager {
  private static permissionMapTitle: { [key: string]: string } = {
    'ios.permission.CAMERA': t('permissionManager.camera'),
  };

  static async checkPermissions(permissions: IOSPermission[]): Promise<boolean | undefined> {
    const statuses = await checkMultiple(permissions);
    const grantedList: IOSPermission[] = [];
    const deniedList: IOSPermission[] = [];
    const limitedList: IOSPermission[] = [];
    const blockedList: IOSPermission[] = [];

    for (const key in statuses) {
      const status = statuses[key as IOSPermission];

      switch (status) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            t('permissionManager.unavailable', {
              permission: this.permissionMapTitle[key],
            }),
          );
          return false;
        case RESULTS.GRANTED:
          grantedList.push(key as IOSPermission);
          break;
        case RESULTS.LIMITED:
          limitedList.push(key as IOSPermission);
          break;
        case RESULTS.DENIED:
          deniedList.push(key as IOSPermission);
          break;
        case RESULTS.BLOCKED:
          blockedList.push(key as IOSPermission);
          break;
      }
    }

    if ([...grantedList, ...limitedList].length === permissions.length) {
      return true;
    } else if (deniedList.length > 0) {
      await requestMultiple(deniedList);
      return await this.checkPermissions(deniedList);
    }

    if (blockedList.length) {
      alertPermissionBlocked(
        t('permissionManager.blocked', {
          permissions: blockedList.map((item) => this.permissionMapTitle[item]).join('、'),
        }),
      );
      return false;
    }
  }
}

export function alertPermissionBlocked(title: string) {
  Alert.alert(title, undefined, [
    {
      text: t('common.cancel'),
      style: 'cancel',
    },
    {
      text: t('permissionManager.openSettings'),
      onPress: openSettings,
    },
  ]);
}
