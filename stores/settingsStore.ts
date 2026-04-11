import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSize } from '../constants/GameSize';
import type { GameSizeValue } from '../types/game';

type SettingsState = {
  isSoundEnabled: boolean;
  isMusicEnabled: boolean;
  isVibrationEnabled: boolean;
  gameSize: GameSizeValue;
  _hasHydrated: boolean;
  setIsSoundEnabled: (v: boolean) => void;
  setIsMusicEnabled: (v: boolean) => void;
  setIsVibrationEnabled: (v: boolean) => void;
  setGameSize: (v: GameSizeValue) => void;
  setHasHydrated: (v: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isSoundEnabled: true,
      isMusicEnabled: true,
      isVibrationEnabled: true,
      gameSize: GameSize.SMALL,
      _hasHydrated: false,
      setIsSoundEnabled: (v) => set({ isSoundEnabled: v }),
      setIsMusicEnabled: (v) => set({ isMusicEnabled: v }),
      setIsVibrationEnabled: (v) => set({ isVibrationEnabled: v }),
      setGameSize: (v) => set({ gameSize: v }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: '@hivesweeper_settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isSoundEnabled: state.isSoundEnabled,
        isMusicEnabled: state.isMusicEnabled,
        isVibrationEnabled: state.isVibrationEnabled,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
