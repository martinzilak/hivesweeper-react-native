import * as R from 'ramda';
import { setBeeStatus } from './gridUtils/setBeeStatus';
import { getIdsOfCellsWithBeeStatus } from './gridUtils/getIdsOfCellsWithBeeStatus';
import { getNeighborsOfCellWithId } from './gridUtils/getNeighborsOfCellWithId';
import { getAdjustedNeighboringBeeCountUpperBound } from './getAdjustedNeighboringBeeCountUpperBound';
import { getCellCountForWidth } from './getCellCountForWidth';
import { randomSubset } from './randomSubset';

const collectNeighbors = (grid, cellId, width) => {
    if (width === 0) {
        return [cellId];
    }

    return R.compose(
        R.uniq,
        R.flatten,
        R.map((neighbor) => collectNeighbors(grid, neighbor.id, width - 1)),
    )(getNeighborsOfCellWithId(grid, cellId));
};

export const limitBigBeeNeighborhoods = (
    gameSize,
    width,
) => (grid) => {
    const beeIdsToUnset = R.reduce((accumulatedCellIds, cell) => {
        const neighborIds = collectNeighbors(grid, cell.id, width);
        const beeIds = R.intersection(neighborIds, getIdsOfCellsWithBeeStatus(grid, true));
        const beeCount = R.length(beeIds);

        const adjustedBeeLimit = Math.ceil(
            getAdjustedNeighboringBeeCountUpperBound(gameSize, width) *
            (R.length(neighborIds) / getCellCountForWidth(width))
        );

        if (beeCount <= adjustedBeeLimit) {
            return accumulatedCellIds;
        }

        const limitExceededBy = R.max(0, beeCount - adjustedBeeLimit);

        return R.uniq([
            ...accumulatedCellIds,
            ...randomSubset(limitExceededBy, beeIds),
        ]);
    }, [])(R.values(grid));

    return setBeeStatus(grid, beeIdsToUnset, false);
};
