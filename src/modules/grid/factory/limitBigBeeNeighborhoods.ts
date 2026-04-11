import { setBeeStatus } from '../mutations/setBeeStatus';
import { getIdsOfCellsWithBeeStatus } from '../queries/getIdsOfCellsWithBeeStatus';
import { getNeighborsOfCellWithId } from '../queries/getNeighborsOfCellWithId';
import { getAdjustedNeighboringBeeCountUpperBound } from './getAdjustedNeighboringBeeCountUpperBound';
import { getCellCountForWidth } from '../geometry/getCellCountForWidth';
import { randomSubset } from './randomSubset';
import type { GameSizeValue, HiveGrid } from 'hivesweeper/shared';

const collectNeighbors = (
  grid: HiveGrid,
  cellId: string,
  width: number,
): string[] => {
  if (width === 0) return [cellId];
  const nested = getNeighborsOfCellWithId(grid, cellId).map((neighbor) =>
    collectNeighbors(grid, neighbor.id, width - 1),
  );
  return [...new Set(nested.flat())];
};

export const limitBigBeeNeighborhoods =
  (gameSize: GameSizeValue, width: number) =>
  (grid: HiveGrid): HiveGrid => {
    const beeIds = getIdsOfCellsWithBeeStatus(grid, true);

    const beeIdsToUnset = Object.values(grid).reduce<string[]>((acc, cell) => {
      const neighborIds = collectNeighbors(grid, cell.id, width);
      const localBeeIds = neighborIds.filter((id) => beeIds.includes(id));
      const beeCount = localBeeIds.length;

      const adjustedBeeLimit = Math.ceil(
        getAdjustedNeighboringBeeCountUpperBound(gameSize, width) *
          (neighborIds.length / getCellCountForWidth(width)),
      );

      if (beeCount <= adjustedBeeLimit) return acc;

      const limitExceededBy = Math.max(0, beeCount - adjustedBeeLimit);
      return [
        ...new Set([...acc, ...randomSubset(limitExceededBy)(localBeeIds)]),
      ];
    }, []);

    return setBeeStatus(grid, beeIdsToUnset, false);
  };
