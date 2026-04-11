import type { HiveGrid } from '../../types/game';

export const getIdsOfCellsWithBeeStatus = (grid: HiveGrid, isBee = true): string[] =>
  Object.values(grid)
    .filter((cell) => cell.isBee === isBee)
    .map((cell) => cell.id);
