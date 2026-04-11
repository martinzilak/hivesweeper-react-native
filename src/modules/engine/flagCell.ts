import { ActionScore } from 'hivesweeper/shared';
import { updateCell } from 'hivesweeper/grid';
import type { GameState } from './types';

export const flagCell = (state: GameState, cellId: string): GameState => {
  if (state.gameStatus !== 'playing') return state;
  const cell = state.grid![cellId];
  if (cell.isRevealed) return state;

  if (cell.isFlagged) {
    return {
      ...state,
      score: state.score - ActionScore.FLAG,
      flagsRemaining: state.flagsRemaining + 1,
      grid: updateCell(state.grid!, { ...cell, isFlagged: false }),
    };
  }
  if (state.flagsRemaining > 0) {
    return {
      ...state,
      score: state.score + ActionScore.FLAG,
      flagsRemaining: state.flagsRemaining - 1,
      grid: updateCell(state.grid!, { ...cell, isFlagged: true }),
    };
  }
  return state;
};
