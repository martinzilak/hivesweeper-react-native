import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { MUSIC_LOOP } from '../assets/Sounds';
import { useSettingsStore } from '../stores/settingsStore';

export const usePlayMusicLoop = () => {
  const isMusicEnabled = useSettingsStore((s) => s.isMusicEnabled);
  const hasHydrated = useSettingsStore((s) => s._hasHydrated);

  const player = useAudioPlayer(isMusicEnabled && hasHydrated ? MUSIC_LOOP : null);

  useEffect(() => {
    if (!hasHydrated) return;
    player.loop = true;
    if (isMusicEnabled) {
      player.play();
    } else {
      player.pause();
    }
  }, [isMusicEnabled, hasHydrated, player]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (!isMusicEnabled) return;
        if (nextState === 'active') {
          player.play();
        } else {
          player.pause();
        }
      },
    );
    return () => subscription.remove();
  }, [isMusicEnabled, player]);
};