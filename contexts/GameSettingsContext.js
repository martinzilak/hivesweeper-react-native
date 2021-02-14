import React, { useState } from 'react';
import { DefaultVolatileSettings } from '../constants/DefaultVolatileSettings';
import { usePersistentGameSettings } from '../hooks/usePersistentGameSettings';

const GameSettingsContext = React.createContext();

export const GameSettingsProvider = ({ children }) => {
    const {
        settings: persistentGameSettings,
        writeSingleSetting: setPersistentGameSetting,
        initiallyLoaded,
    } = usePersistentGameSettings();

    const [volatileGameSettings, setVolatileGameSettings] = useState(DefaultVolatileSettings);

    const setGameSize = (gameSize) => setVolatileGameSettings((previousSettings) => ({
        ...previousSettings,
        gameSize,
    }));

    const setIsSoundEnabled = (isSoundEnabled) => setPersistentGameSetting({ isSoundEnabled });

    const setIsMusicEnabled = (isMusicEnabled) => setPersistentGameSetting({ isMusicEnabled });

    const setIsVibrationEnabled = (isVibrationEnabled) => setPersistentGameSetting({ isVibrationEnabled });

    return (
        <GameSettingsContext.Provider
            value={{
                gameSize: volatileGameSettings.gameSize,
                setGameSize,
                isSoundEnabled: persistentGameSettings.isSoundEnabled,
                setIsSoundEnabled,
                isMusicEnabled: persistentGameSettings.isMusicEnabled,
                setIsMusicEnabled,
                isVibrationEnabled: persistentGameSettings.isVibrationEnabled,
                setIsVibrationEnabled,
                initiallyLoaded,
            }}
        >
            {children}
        </GameSettingsContext.Provider>
    );
};

export const GameSettingsConsumer = GameSettingsContext.Consumer;

export default GameSettingsContext;
