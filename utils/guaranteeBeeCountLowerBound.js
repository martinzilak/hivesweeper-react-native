import * as R from 'ramda';
import { BeeCount } from '../constants/BeeCount';
import { randomSubset } from './randomSubset';

export const guaranteeBeeCountLowerBound = (gameSize) => (grid) => {
    const allIds = grid.getAllIds();
    const notBeeIds = grid.filterCellsWithIdsByBeeStatus(allIds, false);

    const beeCount = R.length(allIds) - R.length(notBeeIds);

    if (beeCount >= BeeCount[gameSize].lowerBound) {
        return grid;
    }

    const limitUndercutBy = BeeCount[gameSize].lowerBound - beeCount;

    return R.o(
        (filteredIds) => grid.changeBeeStatusForCellsWithIds(filteredIds, true),
        randomSubset(limitUndercutBy),
    )(notBeeIds);
};
