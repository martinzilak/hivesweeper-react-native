import React, { createContext, useState } from 'react';
import { DefaultVolatileSettings } from '../constants/DefaultVolatileSettings';
import { usePersistentGameSettings } from '../hooks/usePersistentGameSettings';
import type { GameSizeValue, PersistentSettings } from '../types/game';

type GameSettingsContextValue = {
  gameSize: GameSizeValue;
  setGameSize: (size: GameSizeValue) => void;
  isSoundEnabled: boolean;
  setIsSoundEnabled: (v: boolean) => void;
  isMusicEnabled: boolean;
  setIsMusicEnabled: (v: boolean) => void;
  isVibrationEnabled: boolean;
  setIsVibrationEnabled: (v: boolean) => void;
  initiallyLoaded: boolean;
};

const GameSettingsContext = createContext<GameSettingsContextValue | null>(null);

export const GameSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { settings, writeSingleSetting, initiallyLoaded } = usePersistentGameSettings();
  const [gameSize, setGameSizeState] = useState<GameSizeValue>(DefaultVolatileSettings.gameSize);

  const setGameSize = (size: GameSizeValue) => setGameSizeState(size);
  const setIsSoundEnabled = (isSoundEnabled: boolean) =>
    writeSingleSetting({ isSoundEnabled });
  const setIsMusicEnabled = (isMusicEnabled: boolean) =>
    writeSingleSetting({ isMusicEnabled });
  const setIsVibrationEnabled = (isVibrationEnabled: boolean) =>
    writeSingleSetting({ isVibrationEnabled });

  return (
    <GameSettingsContext.Provider
      value={{
        gameSize,
        setGameSize,
        isSoundEnabled: settings.isSoundEnabled,
        setIsSoundEnabled,
        isMusicEnabled: settings.isMusicEnabled,
        setIsMusicEnabled,
        isVibrationEnabled: settings.isVibrationEnabled,
        setIsVibrationEnabled,
        initiallyLoaded,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export default GameSettingsContext;