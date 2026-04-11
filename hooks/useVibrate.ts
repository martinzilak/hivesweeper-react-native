import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { IsIpad } from '../constants/IsIpad';
import { useGameSettings } from './useGameSettings';

export const useVibrate = () => {
  const { isVibrationEnabled } = useGameSettings();

  const vibrate = useCallback(() => {
    if (isVibrationEnabled && !IsIpad) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [isVibrationEnabled]);

  return { vibrate };
};