import { ActionScore, type HiveCell } from 'hivesweeper/shared';
import {
  setBeeStatus,
  revealAllBees,
  updateCell,
  updateCells,
} from 'hivesweeper/grid';
import type { GameState } from './types';

export const revealCell = (state: GameState, cellId: string): GameState => {
  if (state.gameStatus !== 'playing') return state;
  const cell = state.grid![cellId];

  if (cell.isFlagged) {
    return {
      ...state,
      score: state.score - ActionScore.FLAG,
      flagsRemaining: state.flagsRemaining + 1,
      grid: updateCell(state.grid!, { ...cell, isFlagged: false }),
    };
  }

  if (cell.isBee) {
    if (!state.hasFirstCellBeenRevealed) {
      const gridWithoutBee = setBeeStatus(state.grid!, [cellId], false);
      return floodReveal(
        {
          ...state,
          grid: gridWithoutBee,
          flagsRemaining: state.flagsRemaining - 1,
        },
        cellId,
      );
    }
    return { ...state, gameStatus: 'lost', grid: revealAllBees(state.grid!) };
  }

  if (cell.isRevealed) return state;

  return floodReveal(state, cellId);
};

const floodReveal = (state: GameState, cellId: string): GameState => {
  const grid = state.grid!;
  const cell = grid[cellId];
  let score = state.score + ActionScore.REVEAL_PLAYER;
  const revealed: HiveCell[] = [{ ...cell, isRevealed: true }];

  if (cell.neighboringBees === 0) {
    let queue = [...cell.neighborIds];
    const visited = new Set([cellId]);

    while (queue.length > 0) {
      const neighborId = queue.shift()!;
      if (visited.has(neighborId)) continue;
      visited.add(neighborId);

      const neighbor = grid[neighborId];
      if (
        !neighbor ||
        neighbor.isRevealed ||
        neighbor.isBee ||
        neighbor.isFlagged
      )
        continue;

      revealed.push({ ...neighbor, isRevealed: true });
      score += ActionScore.REVEAL_AUTOMATIC;

      if (neighbor.neighboringBees === 0) {
        neighbor.neighborIds.forEach((id) => {
          if (!visited.has(id)) queue.push(id);
        });
      }
    }
  }

  const newGrid = updateCells(grid, revealed);
  const won = Object.values(newGrid).every((c) => c.isRevealed || c.isBee);
  return {
    ...state,
    grid: newGrid,
    score,
    hasFirstCellBeenRevealed: true,
    gameStatus: won ? 'won' : 'playing',
  };
};
