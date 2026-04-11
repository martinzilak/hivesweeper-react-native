import { useContext } from 'react';
import GameSettingsContext from '../contexts/GameSettingsContext';

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (!context) throw new Error('useGameSettings must be used within GameSettingsProvider');
  return context;
};