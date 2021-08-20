import { useCallback } from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import * as R from 'ramda';
import { IsIpad } from '../constants/IsIpad';
import { VibrationOptions } from '../constants/VibrationOptions';
import { useGameSettings } from './useGameSettings';

export const useVibrate = () => {
    const { isVibrationEnabled } = useGameSettings();

    const vibrate = useCallback(() => {
        if (isVibrationEnabled && !IsIpad) {
            R.apply(ReactNativeHapticFeedback.trigger, VibrationOptions);
        }
    }, [isVibrationEnabled]);

    return { vibrate };
};
