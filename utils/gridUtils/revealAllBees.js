import * as R from 'ramda';

export const revealAllBees = R.o(
    R.forEach((cell) => {
        if (cell.isBee) {
            cell.isFlagged = false;
            cell.isRevealed = true;
        }
    }),
    R.values,
);
