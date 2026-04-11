import * as R from 'ramda';
import type { HiveGrid } from '../../types/game';

export const setBeeStatus = (grid: HiveGrid, cellIds: string[] = [], isBee = true): HiveGrid => {
  if (R.length(cellIds) === 0) return grid;

  const summand = isBee ? +1 : -1;

  return {
    ...grid,
    ...R.reduce((accumulatedGrid: HiveGrid, cellId: string) => {
      const cell = { ...(accumulatedGrid[cellId] ?? grid[cellId]) };
      if (cell.isBee === isBee) return accumulatedGrid;

      cell.isBee = isBee;
      return {
        ...accumulatedGrid,
        [cellId]: cell,
        ...R.reduce((accumulatedNeighbors: HiveGrid, neighborId: string) => {
          const neighbor = { ...(accumulatedGrid[neighborId] ?? grid[neighborId]) };
          neighbor.neighboringBees += summand;
          return { ...accumulatedNeighbors, [neighborId]: neighbor };
        }, {})(cell.neighborIds),
      };
    }, {})(cellIds),
  };
};