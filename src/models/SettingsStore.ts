import {
  clearBlockedApplications,
  setBlockedApplications,
  setShieldApplications,
  clearShieldApplications,
} from '@/lib/ScreenTime';
import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const SettingsStoreModel = types
  .model('SettingsStore')
  .props({
    appLockEnabled: types.optional(types.boolean, false),
    selectedAppCount: types.optional(types.number, 0),
    hideAppEnabled: types.optional(types.boolean, false),
    lockAppEnabled: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setAppLockEnabled: (enabled: boolean) => {
      self.appLockEnabled = enabled;
    },

    setSelectedAppCount: (count: number) => {
      self.selectedAppCount = count;
      if (self.hideAppEnabled) {
        setBlockedApplications();
      }
      if (self.lockAppEnabled) {
        setShieldApplications();
      }

      if (count === 0) {
        clearBlockedApplications();
      }
    },

    setHideAppEnabled: (enabled: boolean) => {
      if (enabled) {
        setBlockedApplications();
      } else {
        clearBlockedApplications();
      }
      self.hideAppEnabled = enabled;
    },

    setLockAppEnabled: (enabled: boolean) => {
      if (enabled) {
        setShieldApplications();
      } else {
        clearShieldApplications();
      }
      self.lockAppEnabled = enabled;
    },
  }));

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotOut extends SnapshotOut<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotIn extends SnapshotIn<typeof SettingsStoreModel> {}
export const createSettingsStoreDefaultModel = () => types.optional(SettingsStoreModel, {});
