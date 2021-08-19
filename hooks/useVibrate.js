import { useCallback } from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import * as R from 'ramda';
import { VibrationOptions } from '../constants/VibrationOptions';
import { useGameSettings } from './useGameSettings';

export const useVibrate = () => {
    const { isVibrationEnabled } = useGameSettings();

    const vibrate = useCallback(() => {
        if (isVibrationEnabled) {
            R.apply(ReactNativeHapticFeedback.trigger, VibrationOptions);
        }
    }, [isVibrationEnabled]);

    return { vibrate };
};
