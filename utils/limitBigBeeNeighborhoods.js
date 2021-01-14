import * as R from 'ramda';
import { getNeighboringBeeCountUpperBound } from './getNeighboringBeeCountUpperBound';
import { getCellCountForWidth } from './getCellCountForWidth';
import { randomSubset } from './randomSubset';
import { unsetIsBee } from './unsetIsBee';

const collectNeighbors = (cell, width) => {
    if (width === 0) {
        return [cell];
    }

    return [
        ...R.o(
            R.flatten,
            R.map((neighbor) => collectNeighbors(neighbor, width - 1)),
        )(cell.neighbors),
    ];
};

export const limitBigBeeNeighborhoods = (
    gameSize,
    width,
) => R.forEach((cell) => {
    const neighbors = R.uniqBy(
        R.prop('id'),
        collectNeighbors(cell, width),
    );
    const bees = R.filter(R.prop('isBee'), neighbors);
    const beeCount = R.length(bees);

    const adjustedBeeLimit = Math.ceil(
        getNeighboringBeeCountUpperBound(gameSize, width) *
        (R.length(neighbors) / getCellCountForWidth(width))
    );

    if (beeCount <= adjustedBeeLimit) {
        return;
    }

    const limitExceededBy = R.max(0, beeCount - adjustedBeeLimit);

    R.o(
        R.forEach(unsetIsBee),
        randomSubset(limitExceededBy),
    )(bees);
});
