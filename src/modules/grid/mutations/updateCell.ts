import type { HiveCell, HiveGrid } from 'hivesweeper/shared';

export const updateCell = (grid: HiveGrid, cell: HiveCell): HiveGrid => ({
  ...grid,
  [cell.id]: cell,
});
