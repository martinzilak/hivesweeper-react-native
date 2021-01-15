import * as R from 'ramda';
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
        )(grid.getNeighborsOfCellWithId(cellId)),
    ];
};

export const limitBigBeeNeighborhoods = (
    gameSize,
    width,
) => (hiveGrid) => {
    const grid = hiveGrid.grid;

    R.forEach((cell) => {
        const neighborIds = R.uniq(
            collectNeighbors(grid, cell.id, width),
        );
        const beeIds = grid.filterCellsWithIdsByBeeStatus(neighborIds, true);
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
            (filteredBeeIds) => grid.changeBeeStatusForCellsWithIds(filteredBeeIds, false),
            randomSubset(limitExceededBy),
        )(beeIds);
    })(grid.getPrimitiveGrid());

    return hiveGrid;
};
