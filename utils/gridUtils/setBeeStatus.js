import * as R from 'ramda';

export const setBeeStatus = (grid, cellIds = [], isBee = true) => {
    if (R.length(cellIds) === 0) {
        return grid;
    }

    const summand = isBee ? +1 : -1;

    return {
        ...grid,
        ...R.reduce((accumulatedGrid, cellId) => {
            const cell = accumulatedGrid[cellId] ?? grid[cellId];
            if (cell.isBee === isBee) {
                return accumulatedGrid;
            }

            cell.isBee = isBee;
            return {
                ...accumulatedGrid,
                [cellId]: cell,
                ...R.reduce((accumulatedNeighbors, neigborId) => {
                    const neighbor = accumulatedGrid[neigborId] ?? grid[neigborId];
                    neighbor.neighboringBees += summand;

                    return {
                        ...accumulatedNeighbors,
                        [neigborId]: neighbor,
                    };
                }, {})(cell.neighborIds),
            };
        }, {})(cellIds),
    };
};
