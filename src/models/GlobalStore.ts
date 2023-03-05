import { BiometryType } from '@/utils';
import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const GlobalStoreModel = types
  .model('GlobalStore')
  .props({
    isLocked: types.optional(types.boolean, true),
    biometricsType: types.optional(
      types.enumeration<BiometryType>('BiometryType', Object.values(BiometryType)),
      BiometryType.None,
    ),
  })
  .actions((self) => ({
    setBiometricsType: (type: BiometryType) => {
      self.biometricsType = type;
    },

    lock: () => {
      self.isLocked = true;
    },

    unlock: () => {
      self.isLocked = false;
    },
  }));

export interface GlobalStore extends Instance<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotOut extends SnapshotOut<typeof GlobalStoreModel> {}
export interface GlobalStoreSnapshotIn extends SnapshotIn<typeof GlobalStoreModel> {}
export const createGlobalStoreDefaultModel = () => types.optional(GlobalStoreModel, {});
