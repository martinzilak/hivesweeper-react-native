import { useCallback, useEffect, useState } from 'react';
import { DefaultPersistentSettings } from '../constants/DefaultPersistentSettings';
import { getSettingsItem, setSettingsItem } from '../utils/AsyncStorage';
import type { PersistentSettings } from '../types/game';

export const usePersistentGameSettings = () => {
  const [settings, setSettings] = useState<PersistentSettings>(DefaultPersistentSettings);
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);

  const readSettings = useCallback(async () => {
    const stored = await getSettingsItem();
    if (stored) setSettings(stored);
  }, []);

  const writeSingleSetting = useCallback(
    async (newSetting: Partial<PersistentSettings>) => {
      const newSettings = { ...settings, ...newSetting };
      await setSettingsItem(newSettings);
      setSettings(newSettings);
    },
    [settings],
  );

  useEffect(() => {
    readSettings().then(() => setInitiallyLoaded(true));
  }, [readSettings]);

  return { settings, writeSingleSetting, initiallyLoaded };
};