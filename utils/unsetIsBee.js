import * as R from 'ramda';

export const unsetIsBee = (cell) => {
    if (cell.isBee) {
        cell.setIsBee(false);

        R.forEach((neighbor) => {
            neighbor.setNeighboringBees(neighbor.neighboringBees - 1);
        })(cell.neighbors);
    }
};
