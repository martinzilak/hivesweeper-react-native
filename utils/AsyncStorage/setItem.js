import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../../constants/StorageKey';

const setItem = async (storageKey, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(storageKey, jsonValue);
    } catch(e) {
        // console.error(e);
    }
};

export const setSettingsItem = async (value) => {
    await setItem(StorageKey.SETTINGS, value);
};

export const setStatsItem = async (value) => {
    await setItem(StorageKey.STATS, value);
};
