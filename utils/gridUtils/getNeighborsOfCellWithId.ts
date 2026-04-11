import type { HiveCell, HiveGrid } from '../../types/game';

export const getNeighborsOfCellWithId = (grid: HiveGrid, cellId: string): HiveCell[] => {
  const neighborIds = grid[cellId]?.neighborIds ?? [];
  return neighborIds.map((id) => grid[id]);
};
