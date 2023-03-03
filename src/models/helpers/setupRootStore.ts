import type { RootStore } from '../RootStore';
import { persist } from './persist';

const SETTINGS_STATE_STORAGE_KEY = 'settings-v1';

/**
 * Setup the root state.
 */
export async function setupRootStore(rootStore: RootStore) {
  try {
    const { settingsStore } = rootStore;

    persist(SETTINGS_STATE_STORAGE_KEY, settingsStore);
  } catch (e) {
    if (__DEV__) {
      console.error('setupRootStore', e, null);
    }
  }
}
