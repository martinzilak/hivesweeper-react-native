import { useCallback } from 'react';
import { Vibration } from 'react-native';
import { VibrationDurationMs } from '../constants/VibrationDurationMs';
import { useGameSettings } from './useGameSettings';

export const useVibrate = () => {
    const { isVibrationEnabled } = useGameSettings();

    const vibrate = useCallback(() => {
        if (isVibrationEnabled) {
            Vibration.vibrate(VibrationDurationMs);
        }
    }, [isVibrationEnabled]);

    return { vibrate };
};
