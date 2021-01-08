import { useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { MUSIC_LOOP } from '../assets/Sounds';
import { playMusicLoop } from '../utils/playMusicLoop';
import { useGameSettings } from './useGameSettings';

export const usePlayMusicLoop = () => {
    const { isMusicEnabled } = useGameSettings();
    const isMusicEnabledRef = useRef(isMusicEnabled);

    const handleAppStateChange = useCallback((nextAppState) => {
        if (nextAppState === 'active') {
            if (isMusicEnabledRef.current && !MUSIC_LOOP.isPlaying()) {
                playMusicLoop();
            }
        } else {
            if (MUSIC_LOOP.isPlaying()) {
                MUSIC_LOOP.stop();
            }
        }
    }, []);

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, [handleAppStateChange]);

    useEffect(() => {
        isMusicEnabledRef.current = isMusicEnabled;

        if (isMusicEnabled) {
            if (!MUSIC_LOOP.isPlaying()) {
                playMusicLoop();
            }
        } else {
            if (MUSIC_LOOP.isPlaying()) {
                MUSIC_LOOP.stop();
            }
        }
    }, [isMusicEnabled]);
};
