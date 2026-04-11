import type { HiveCell, HiveGrid } from 'hivesweeper/shared';

export const getNeighborsOfCellWithId = (grid: HiveGrid, cellId: string): HiveCell[] => {
  const neighborIds = grid[cellId]?.neighborIds ?? [];
  return neighborIds.map((id) => grid[id]);
};
