import { useCallback } from 'react';
import { Vibration } from 'react-native';
import { useGameSettings } from './useGameSettings';

export const useVibrate = () => {
    const { isVibrationEnabled } = useGameSettings();

    const vibrate = useCallback(() => {
        if (isVibrationEnabled) {
            Vibration.vibrate();
        }
    }, [isVibrationEnabled]);

    return { vibrate };
};
