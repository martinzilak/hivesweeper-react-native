import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Audio } from 'expo-av';
import { MUSIC_LOOP } from '../assets/Sounds';
import { useGameSettings } from './useGameSettings';

export const usePlayMusicLoop = () => {
  const { isMusicEnabled, initiallyLoaded } = useGameSettings();
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    if (!initiallyLoaded) return;

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
  }, [isMusicEnabled, initiallyLoaded]);

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