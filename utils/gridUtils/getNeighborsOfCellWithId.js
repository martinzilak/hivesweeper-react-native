import * as R from 'ramda';

export const getNeighborsOfCellWithId = (grid, cellId) => {
    const neighborIds = grid[cellId]?.neighborIds ?? [];
    return R.map((neighborId) => grid[neighborId])(neighborIds);
};
