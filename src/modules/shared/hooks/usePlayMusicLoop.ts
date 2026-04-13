import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { MUSIC_LOOP } from '../assets/Sounds';
// Direct import to avoid shared ↔ settings circular dependency
import { useSettingsStore } from '../../settings/store';

export const usePlayMusicLoop = () => {
  const isMusicEnabled = useSettingsStore((s) => s.isMusicEnabled);
  const hasHydrated = useSettingsStore((s) => s._hasHydrated);

  const player = useAudioPlayer(
    isMusicEnabled && hasHydrated ? MUSIC_LOOP : null,
  );

  useEffect(() => {
    if (!hasHydrated) return;
    player.loop = true;
    if (isMusicEnabled) {
      player.play();
      if (Platform.OS === 'web') {
        // Browsers block autoplay until a user interaction has occurred.
        // If play() was silently blocked, retry on the first pointer event.
        const retryOnInteraction = () => player.play();
        document.addEventListener('pointerdown', retryOnInteraction, { once: true });
        return () => document.removeEventListener('pointerdown', retryOnInteraction);
      }
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
