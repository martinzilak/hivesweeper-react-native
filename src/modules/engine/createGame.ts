import type { GameSizeValue } from 'hivesweeper/shared';
import { generateGrid } from 'hivesweeper/grid';
import type { GameState } from './types';

export const createGame = (gameSize: GameSizeValue): GameState => {
  const grid = generateGrid(gameSize);
  return {
    grid,
    gameSize,
    gameStatus: 'playing',
    score: 0,
    flagsRemaining: Object.values(grid).filter((c) => c.isBee).length,
    hasFirstCellBeenRevealed: false,
    isNewBestScore: null,
  };
};
