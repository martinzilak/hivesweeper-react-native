import * as R from 'ramda';
import { TotalBeeCount } from '../constants/TotalBeeCount';
import { randomSubset } from './randomSubset';

export const guaranteeBeeCountLowerBound = (gameSize) => (grid) => {
    const allIds = grid.getAllIds();
    const notBeeIds = grid.filterCellsWithIdsByBeeStatus(allIds, false);

    const beeCount = R.length(allIds) - R.length(notBeeIds);

    if (beeCount >= TotalBeeCount[gameSize].lowerBound) {
        return grid;
    }

    const limitUndercutBy = TotalBeeCount[gameSize].lowerBound - beeCount;

    return R.o(
        (filteredIds) => grid.changeBeeStatusForCellsWithIds(filteredIds, true),
        randomSubset(limitUndercutBy),
    )(notBeeIds);
};
