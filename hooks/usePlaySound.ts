import { useCallback } from 'react';
import { createAudioPlayer } from 'expo-audio';
import { useSettingsStore } from '../stores/settingsStore';

export const usePlaySound = () => {
  const isSoundEnabled = useSettingsStore((s) => s.isSoundEnabled);

  const playSound = useCallback(
    (source: number) => {
      if (!isSoundEnabled) return;
      const player = createAudioPlayer(source);
      player.play();
      // expo-audio players created via createAudioPlayer must be manually removed.
      // Poll for completion and clean up.
      const interval = setInterval(() => {
        if (!player.playing && player.isLoaded) {
          player.remove();
          clearInterval(interval);
        }
      }, 100);
    },
    [isSoundEnabled],
  );

  return { playSound };
};