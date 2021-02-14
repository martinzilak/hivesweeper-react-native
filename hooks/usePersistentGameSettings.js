import { useCallback, useEffect, useState } from 'react';
import { DefaultPersistentSettings } from '../constants/DefaultPersistentSettings';
import { getSettingsItem, setSettingsItem } from '../utils/AsyncStorage';

export const usePersistentGameSettings = () => {
    const [settings, setSettings] = useState(DefaultPersistentSettings);
    const [initiallyLoaded, setInitiallyLoaded] = useState(false);

    const readSettings = useCallback(async () => {
        const settingsValue = await getSettingsItem();
        if (settingsValue) {
            setSettings(settingsValue);
        }
    }, []);

    const writeSingleSetting = useCallback(async (newSetting) => {
        const newSettings = {
            ...settings,
            ...newSetting,
        };
        await setSettingsItem(newSettings);
        setSettings(newSettings);
    }, [settings]);

    useEffect(() => {
        readSettings().then(() => setInitiallyLoaded(true));
    }, [readSettings]);

    return { settings, writeSingleSetting, initiallyLoaded };
};
