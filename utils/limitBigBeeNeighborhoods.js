import * as R from 'ramda';
import { setBeeStatus } from './gridUtils/setBeeStatus';
import { getIdsOfCellsWithBeeStatus } from './gridUtils/getIdsOfCellsWithBeeStatus';
import { getNeighborsOfCellWithId } from './gridUtils/getNeighborsOfCellWithId';
import { getNeighboringBeeCountUpperBound } from './getNeighboringBeeCountUpperBound';
import { getCellCountForWidth } from './getCellCountForWidth';
import { randomSubset } from './randomSubset';

const collectNeighbors = (grid, cellId, width) => {
    if (width === 0) {
        return [cellId];
    }

    return [
        ...R.o(
            R.flatten,
            R.map((neighbor) => collectNeighbors(grid, neighbor.id, width - 1)),
        )(getNeighborsOfCellWithId(grid, cellId)),
    ];
};

export const limitBigBeeNeighborhoods = (
    gameSize,
    width,
) => (grid) => {
    R.forEach((cell) => {
        const neighborIds = R.uniq(
            collectNeighbors(grid, cell.id, width),
        );
        const beeIds = R.intersection(neighborIds, getIdsOfCellsWithBeeStatus(grid, true));
        const beeCount = R.length(beeIds);

        const adjustedBeeLimit = Math.ceil(
            getNeighboringBeeCountUpperBound(gameSize, width) *
            (R.length(neighborIds) / getCellCountForWidth(width))
        );

        if (beeCount <= adjustedBeeLimit) {
            return;
        }

        const limitExceededBy = R.max(0, beeCount - adjustedBeeLimit);

        R.o(
            R.forEach((cellId) => setBeeStatus(grid, cellId, false)),
            randomSubset(limitExceededBy),
        )(beeIds);
    })(R.values(grid));

    return grid;
};
