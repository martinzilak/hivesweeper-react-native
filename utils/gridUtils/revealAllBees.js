import * as R from 'ramda';

export const revealAllBees = R.map((cell) => {
    if (!cell.isBee) {
        return cell;
    }

    cell.isFlagged = false;
    cell.isRevealed = true;
    return cell;
});
