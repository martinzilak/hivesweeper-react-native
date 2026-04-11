import type { HiveGrid } from 'hivesweeper/shared';

export const setBeeStatus = (
  grid: HiveGrid,
  cellIds: string[] = [],
  isBee = true,
): HiveGrid => {
  if (cellIds.length === 0) return grid;

  const summand = isBee ? +1 : -1;

  return {
    ...grid,
    ...cellIds.reduce<HiveGrid>((accumulatedGrid, cellId) => {
      const cell = { ...(accumulatedGrid[cellId] ?? grid[cellId]) };
      if (cell.isBee === isBee) return accumulatedGrid;

      cell.isBee = isBee;
      return {
        ...accumulatedGrid,
        [cellId]: cell,
        ...cell.neighborIds.reduce<HiveGrid>(
          (accumulatedNeighbors, neighborId) => {
            const neighbor = {
              ...(accumulatedGrid[neighborId] ?? grid[neighborId]),
            };
            neighbor.neighboringBees += summand;
            return { ...accumulatedNeighbors, [neighborId]: neighbor };
          },
          {},
        ),
      };
    }, {}),
  };
};
