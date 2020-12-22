import React, {useState} from 'react';
import {HIVE_SIZE} from "../constants/constants";

const GameSettingsContext = React.createContext();

const defaultSettings = {
    gameSize: HIVE_SIZE.SMALL,
    isSoundEnabled: true,
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

    return (
        <GameSettingsContext.Provider
            value={{
                gameSize: gameSettings.gameSize,
                setGameSize,
                isSoundEnabled: gameSettings.isSoundEnabled,
                setIsSoundEnabled,
            }}
        >
            {children}
        </GameSettingsContext.Provider>
    );
};

export const GameSettingsConsumer = GameSettingsContext.Consumer;

export default GameSettingsContext;
