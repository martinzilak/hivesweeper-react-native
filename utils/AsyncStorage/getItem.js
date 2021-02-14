import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKey } from '../../constants/StorageKey';

const getItem = async (storageKey) => {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey);
        if (jsonValue) {
            return JSON.parse(jsonValue);
        } else {
            return null;
        }
    } catch(e) {
        // console.error(e);
    }
};

export const getSettingsItem = async () => {
    return await getItem(StorageKey.SETTINGS);
};

export const getStatsItem = async () => {
    return await getItem(StorageKey.STATS);
};
