import * as R from 'ramda';

export const setIsBee = (cell) => {
    if (!cell.isBee) {
        cell.setIsBee(true);

        R.forEach((neighbor) => {
            neighbor.setNeighboringBees(neighbor.neighboringBees + 1);
        })(cell.neighbors);
    }
};
