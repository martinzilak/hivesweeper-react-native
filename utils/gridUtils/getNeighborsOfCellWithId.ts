import * as R from 'ramda';
import type { HiveCell, HiveGrid } from '../../types/game';

export const getNeighborsOfCellWithId = (grid: HiveGrid, cellId: string): HiveCell[] => {
  const neighborIds = grid[cellId]?.neighborIds ?? [];
  return R.map((neighborId: string) => grid[neighborId])(neighborIds);
};