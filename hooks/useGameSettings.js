import { useContext } from 'react';
import GameSettingsContext from '../contexts/GameSettingsContext';

export const useGameSettings = () => {
    const gameSettingsContext = useContext(GameSettingsContext);
    return gameSettingsContext;
};
