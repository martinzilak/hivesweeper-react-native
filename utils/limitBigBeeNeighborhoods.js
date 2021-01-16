import * as R from 'ramda';
import { getNeighboringBeeCountUpperBound } from './getNeighboringBeeCountUpperBound';
import { getCellCountForWidth } from './getCellCountForWidth';
import { randomSubset } from './randomSubset';

const collectNeighbors = (hiveGrid, cellId, width) => {
    if (width === 0) {
        return [cellId];
    }

    return [
        ...R.o(
            R.flatten,
            R.map((neighbor) => collectNeighbors(hiveGrid, neighbor.id, width - 1)),
        )(hiveGrid.getNeighborsOfCellWithId(cellId)),
    ];
};

export const limitBigBeeNeighborhoods = (
    gameSize,
    width,
) => (hiveGrid) => {
    R.forEach((cell) => {
        const neighborIds = R.uniq(
            collectNeighbors(hiveGrid, cell.id, width),
        );
        const beeIds = hiveGrid.filterCellsWithIdsByBeeStatus(neighborIds, true);
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
            (filteredBeeIds) => hiveGrid.changeBeeStatusForCellsWithIds(filteredBeeIds, false),
            randomSubset(limitExceededBy),
        )(beeIds);
    })(hiveGrid.getPrimitiveGrid());

    return hiveGrid;
};
