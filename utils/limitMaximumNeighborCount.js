import * as R from 'ramda';
import { NeighboringBeeCountUpperBound } from '../constants/NeighboringBeeCountUpperBound';
import { randomSubset } from './randomSubset';
import { unsetIsBee } from './unsetIsBee';

export const limitMaximumNeighborCount = (gameSize) => R.forEach((cell) => {
    const neighborCount = R.length(cell.neighbors);

    if ((neighborCount - cell.neighboringBees) > 0 &&
        cell.neighboringBees <= NeighboringBeeCountUpperBound[gameSize]
    ) {
        return;
    }

    const limitExceededBy = R.max(1, cell.neighboringBees - NeighboringBeeCountUpperBound[gameSize]);

    R.compose(
        R.forEach(unsetIsBee),
        randomSubset(limitExceededBy),
        R.filter(R.prop('isBee')),
    )(cell.neighbors);
});
