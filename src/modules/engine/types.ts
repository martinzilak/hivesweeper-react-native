import type { GameSizeValue, HiveGrid } from 'hivesweeper/shared';

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

export type GameState = {
  grid: HiveGrid | null;
  gameSize: GameSizeValue;
  gameStatus: GameStatus;
  score: number;
  flagsRemaining: number;
  hasFirstCellBeenRevealed: boolean;
  isNewBestScore: boolean | null;
};
