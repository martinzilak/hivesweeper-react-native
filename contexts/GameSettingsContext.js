import React from 'react';
import { usePersistentGameSettings } from '../hooks/usePersistentGameSettings';

const GameSettingsContext = React.createContext();

export const GameSettingsProvider = ({ children }) => {
    const { settings: gameSettings, writeSingleSetting: setGameSetting } = usePersistentGameSettings();

    const setGameSize = (gameSize) => setGameSetting({ gameSize });

    const setIsSoundEnabled = (isSoundEnabled) => setGameSetting({ isSoundEnabled });

    const setIsMusicEnabled = (isMusicEnabled) => setGameSetting({ isMusicEnabled });

    const setIsVibrationEnabled = (isVibrationEnabled) => setGameSetting({ isVibrationEnabled });

    return (
        <GameSettingsContext.Provider
            value={{
                gameSize: gameSettings.gameSize,
                setGameSize,
                isSoundEnabled: gameSettings.isSoundEnabled,
                setIsSoundEnabled,
                isMusicEnabled: gameSettings.isMusicEnabled,
                setIsMusicEnabled,
                isVibrationEnabled: gameSettings.isVibrationEnabled,
                setIsVibrationEnabled,
            }}
        >
            {children}
        </GameSettingsContext.Provider>
    );
};

export const GameSettingsConsumer = GameSettingsContext.Consumer;

export default GameSettingsContext;
