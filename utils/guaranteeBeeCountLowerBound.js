import * as R from 'ramda';
import { TotalBeeCount } from '../constants/TotalBeeCount';
import { randomSubset } from './randomSubset';
import { setIsBee } from './setIsBee';

export const guaranteeBeeCountLowerBound = (gameSize) => (grid) => {
    const beeCount = R.o(
        R.length,
        R.filter(R.prop('isBee')),
    )(grid);

    if (beeCount >= TotalBeeCount[gameSize].lowerBound) {
        return grid;
    }

    const limitUndercutBy = TotalBeeCount[gameSize].lowerBound - beeCount;

    R.compose(
        R.forEach(setIsBee),
        randomSubset(limitUndercutBy),
        R.reject(R.prop('isBee')),
    )(grid);

    return grid;
};
