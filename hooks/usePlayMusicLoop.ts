import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Audio } from 'expo-av';
import { MUSIC_LOOP } from '../assets/Sounds';
import { useSettingsStore } from '../stores/settingsStore';

export const usePlayMusicLoop = () => {
  const isMusicEnabled = useSettingsStore((s) => s.isMusicEnabled);
  const hasHydrated = useSettingsStore((s) => s._hasHydrated);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    let mounted = true;

    const load = async () => {
      await soundRef.current?.unloadAsync();
      soundRef.current = null;

      if (!isMusicEnabled) return;

      const { sound } = await Audio.Sound.createAsync(MUSIC_LOOP, {
        isLooping: true,
        shouldPlay: true,
      });
      if (mounted) {
        soundRef.current = sound;
      } else {
        sound.unloadAsync();
      }
    };

    load();

    return () => {
      mounted = false;
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, [isMusicEnabled, hasHydrated]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextState: AppStateStatus) => {
        if (!soundRef.current) return;
        if (nextState === 'active') {
          await soundRef.current.playAsync();
        } else {
          await soundRef.current.pauseAsync();
        }
      },
    );
    return () => subscription.remove();
  }, []);
};
