import type { HiveCell, HiveGrid } from '../../types/game';

export const updateCells = (grid: HiveGrid, cells: HiveCell[]): HiveGrid => ({
  ...grid,
  ...cells.reduce<HiveGrid>((acc, cell) => ({ ...acc, [cell.id]: cell }), {}),
});
