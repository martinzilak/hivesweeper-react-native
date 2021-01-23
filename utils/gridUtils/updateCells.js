import * as R from 'ramda';

export const updateCells = (grid, cells) => ({
    ...grid,
    ...R.reduce((accumulatedGrid, cell) => ({
        ...accumulatedGrid,
        [cell.id]: cell,
    }), {})(cells),
});
