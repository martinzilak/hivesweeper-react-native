import type { HiveCell, HiveGrid } from '../../types/game';

export const updateCell = (grid: HiveGrid, cell: HiveCell): HiveGrid => ({
  ...grid,
  [cell.id]: cell,
});