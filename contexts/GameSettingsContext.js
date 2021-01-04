import React, { useState } from 'react';
import { HIVE_SIZE } from '../constants/Constants';

const GameSettingsContext = React.createContext();

const defaultSettings = {
    gameSize: HIVE_SIZE.SMALL,
    isSoundEnabled: true,
    isMusicEnabled: true,
};

export const GameSettingsProvider = ({ settings, children }) => {
    const [gameSettings, setGameSettings] = useState(settings ?? defaultSettings);

    const setGameSize = (gameSize) => {
        setGameSettings((previousSettings) => ({
            ...previousSettings,
            gameSize,
        }));
    };

    const setIsSoundEnabled = (isSoundEnabled) => {
        setGameSettings((previousSettings) => ({
            ...previousSettings,
            isSoundEnabled,
        }));
    };

    const setIsMusicEnabled = (isMusicEnabled) => {
        setGameSettings((previousSettings) => ({
            ...previousSettings,
            isMusicEnabled,
        }));
    };

    return (
        <GameSettingsContext.Provider
            value={{
                gameSize: gameSettings.gameSize,
                setGameSize,
                isSoundEnabled: gameSettings.isSoundEnabled,
                setIsSoundEnabled,
                isMusicEnabled: gameSettings.isMusicEnabled,
                setIsMusicEnabled,
            }}
        >
            {children}
        </GameSettingsContext.Provider>
    );
};

export const GameSettingsConsumer = GameSettingsContext.Consumer;

export default GameSettingsContext;
