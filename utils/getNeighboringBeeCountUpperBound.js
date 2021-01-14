import { NeighboringBeeCountUpperBound } from '../constants/NeighboringBeeCountUpperBound';

export const getNeighboringBeeCountUpperBound = (gameSize, width) => {
    if (width === 1) {
        return NeighboringBeeCountUpperBound[gameSize];
    }
    const wholePart = width - 1;
    const decimalPart = width / (width + 1);
    return Math.ceil((wholePart + decimalPart) * NeighboringBeeCountUpperBound[gameSize]);
}