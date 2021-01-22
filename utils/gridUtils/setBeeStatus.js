import * as R from 'ramda';
import { updateCells } from './updateCells';
import { getNeighborsOfCellWithId } from './getNeighborsOfCellWithId';

export const setBeeStatus = (grid, cellId, isBee = true) => {
    const summand = isBee ? +1 : -1;
    const cell = grid[cellId];

    if (cell.isBee !== isBee) {
        cell.isBee = isBee;

        const updatedCells = [
            cell,
            ...R.forEach((neighbor) => {
                neighbor.neighboringBees += summand;
            })(getNeighborsOfCellWithId(grid, cellId)),
        ];

        return updateCells(grid, updatedCells);
    }

    return grid;
};
