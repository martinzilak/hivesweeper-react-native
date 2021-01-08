import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { DefaultSettings } from '../constants/DefaultSettings';
import { StorageKey } from '../constants/StorageKey';

export const usePersistentGameSettings = () => {
    const [settings, setSettings] = useState(DefaultSettings);
    const { getItem, setItem } = useAsyncStorage(StorageKey.SETTINGS);

    const readSettings = async () => {
        const settingsJson = await getItem();
        if (settingsJson) {
            setSettings(JSON.parse(settingsJson));
        }
    };

    const writeSingleSetting = async (newSetting) => {
        const settingsValue = {
            ...settings,
            ...newSetting,
        }
        await setItem(JSON.stringify(settingsValue));
        setSettings(settingsValue);
    };

    useEffect(() => {
        readSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { settings, writeSingleSetting };
};