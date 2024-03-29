import * as R from 'ramda';
import { TotalBeeCount } from '../constants/TotalBeeCount';
import { getIdsOfCellsWithBeeStatus } from './gridUtils/getIdsOfCellsWithBeeStatus';
import { setBeeStatus } from './gridUtils/setBeeStatus';
import { randomSubset } from './randomSubset';

export const guaranteeBeeCountLowerBound = (gameSize) => (grid) => {
    const notBeeIds = getIdsOfCellsWithBeeStatus(grid, false);
    const beeCount = R.length(R.keys(grid)) - R.length(notBeeIds);

    if (beeCount >= TotalBeeCount[gameSize].lowerBound) {
        return grid;
    }

    const limitUndercutBy = TotalBeeCount[gameSize].lowerBound - beeCount;

    return R.o(
        (cellIds) => setBeeStatus(grid, cellIds, true),
        randomSubset(limitUndercutBy),
    )(notBeeIds);
};
