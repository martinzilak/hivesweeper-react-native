import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../../constants/StorageKey';
import type { PersistentSettings, Stats } from '../../types/game';

const setItem = async (storageKey: string, value: unknown): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // silently ignore storage errors
  }
};

export const setSettingsItem = (value: PersistentSettings): Promise<void> =>
  setItem(StorageKey.SETTINGS, value);

export const setStatsItem = (value: Stats): Promise<void> =>
  setItem(StorageKey.STATS, value);