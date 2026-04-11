import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { IsIpad } from '../constants/IsIpad';
import { useSettingsStore } from 'hivesweeper/settings';

export const useVibrate = () => {
  const isVibrationEnabled = useSettingsStore((s) => s.isVibrationEnabled);

  const vibrate = useCallback(() => {
    if (isVibrationEnabled && !IsIpad) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [isVibrationEnabled]);

  return { vibrate };
};
