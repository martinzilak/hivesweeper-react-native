import { useCallback } from 'react';
import { Audio, AVPlaybackSource } from 'expo-av';
import { useSettingsStore } from '../stores/settingsStore';

export const usePlaySound = () => {
  const isSoundEnabled = useSettingsStore((s) => s.isSoundEnabled);

  const playSound = useCallback(
    async (source: AVPlaybackSource) => {
      if (!isSoundEnabled) return;
      const { sound } = await Audio.Sound.createAsync(source);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    },
    [isSoundEnabled],
  );

  return { playSound };
};
