import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import { SettingsStoreModel } from './SettingsStore';
import { GlobalStoreModel } from './GlobalStore';

export const RootStoreModel = types.model('RootStore').props({
  settingsStore: types.optional(SettingsStoreModel, {}),
  globalStore: types.optional(GlobalStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
