import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../../constants/StorageKey';
import type { PersistentSettings, Stats } from '../../types/game';

const getItem = async <T>(storageKey: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    if (jsonValue) return JSON.parse(jsonValue) as T;
    return null;
  } catch {
    return null;
  }
};

export const getSettingsItem = (): Promise<PersistentSettings | null> =>
  getItem<PersistentSettings>(StorageKey.SETTINGS);

export const getStatsItem = (): Promise<Stats | null> =>
  getItem<Stats>(StorageKey.STATS);