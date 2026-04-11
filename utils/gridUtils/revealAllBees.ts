import type { HiveGrid } from '../../types/game';

export const revealAllBees = (grid: HiveGrid): HiveGrid =>
  Object.fromEntries(
    Object.entries(grid).map(([id, cell]) => [
      id,
      cell.isBee ? { ...cell, isFlagged: false, isRevealed: true } : cell,
    ]),
  );
