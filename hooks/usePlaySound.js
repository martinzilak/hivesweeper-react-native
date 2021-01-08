import { useCallback } from 'react';
import * as R from 'ramda';
import { useGameSettings } from './useGameSettings';

export const usePlaySound = () => {
    const { isSoundEnabled } = useGameSettings();

    const playSound = useCallback((sound) => {
        if (isSoundEnabled && !R.isNil(sound) && R.hasIn('play', sound)) {
            sound.play();
        }
    }, [isSoundEnabled]);

    return { playSound };
};
