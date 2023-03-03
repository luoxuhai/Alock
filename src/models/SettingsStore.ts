import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const SettingsStoreModel = types
  .model('SettingsStore')
  .props({
    appLockEnabled: types.optional(types.boolean, false),
    isLocked: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setAppLockEnabled: (enabled: boolean) => {
      self.appLockEnabled = enabled;
    },

    lock: () => {
      self.isLocked = true;
    },

    unlock: () => {
      self.isLocked = false;
    },
  }));

export interface SettingsStore extends Instance<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotOut extends SnapshotOut<typeof SettingsStoreModel> {}
export interface SettingsStoreSnapshotIn extends SnapshotIn<typeof SettingsStoreModel> {}
export const createSettingsStoreDefaultModel = () => types.optional(SettingsStoreModel, {});
