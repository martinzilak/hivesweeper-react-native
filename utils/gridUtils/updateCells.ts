import * as R from 'ramda';
import type { HiveCell, HiveGrid } from '../../types/game';

export const updateCells = (grid: HiveGrid, cells: HiveCell[]): HiveGrid => ({
  ...grid,
  ...R.reduce((accumulatedGrid: HiveGrid, cell: HiveCell) => ({
    ...accumulatedGrid,
    [cell.id]: cell,
  }), {})(cells),
});