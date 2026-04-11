import * as R from 'ramda';
import { setBeeStatus } from './gridUtils/setBeeStatus';
import { getIdsOfCellsWithBeeStatus } from './gridUtils/getIdsOfCellsWithBeeStatus';
import { getNeighborsOfCellWithId } from './gridUtils/getNeighborsOfCellWithId';
import { getAdjustedNeighboringBeeCountUpperBound } from './getAdjustedNeighboringBeeCountUpperBound';
import { getCellCountForWidth } from './getCellCountForWidth';
import { randomSubset } from './randomSubset';
import type { GameSizeValue, HiveCell, HiveGrid } from '../types/game';

const collectNeighbors = (grid: HiveGrid, cellId: string, width: number): string[] => {
  if (width === 0) return [cellId];

  const neighbors = getNeighborsOfCellWithId(grid, cellId);
  const nested = R.map((neighbor: HiveCell) => collectNeighbors(grid, neighbor.id, width - 1))(neighbors);
  return R.uniq(R.flatten(nested)) as string[];
};

export const limitBigBeeNeighborhoods =
  (gameSize: GameSizeValue, width: number) =>
  (grid: HiveGrid): HiveGrid => {
    const beeIdsToUnset: string[] = (R.values(grid) as HiveCell[]).reduce(
      (accumulatedCellIds: string[], cell: HiveCell): string[] => {
        const neighborIds = collectNeighbors(grid, cell.id, width);
        const beeIds = R.intersection(neighborIds, getIdsOfCellsWithBeeStatus(grid, true));
        const beeCount = R.length(beeIds);

        const adjustedBeeLimit = Math.ceil(
          getAdjustedNeighboringBeeCountUpperBound(gameSize, width) *
            (R.length(neighborIds) / getCellCountForWidth(width)),
        );

        if (beeCount <= adjustedBeeLimit) return accumulatedCellIds;

        const limitExceededBy = R.max(0, beeCount - adjustedBeeLimit);

        return R.uniq([...accumulatedCellIds, ...(randomSubset(limitExceededBy)(beeIds) as string[])]);
      },
      [],
    );

    return setBeeStatus(grid, beeIdsToUnset, false);
  };