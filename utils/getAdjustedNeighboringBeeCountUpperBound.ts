import { NeighboringBeeCountUpperBound } from '../constants/NeighboringBeeCountUpperBound';
import type { GameSizeValue } from '../types/game';

export const getAdjustedNeighboringBeeCountUpperBound = (
  gameSize: GameSizeValue,
  width: number,
): number => {
  if (width === 1) {
    return NeighboringBeeCountUpperBound[gameSize];
  }

  const wholePart = width - 1;
  const decimalPart = width / (width + 1);
  return Math.ceil((wholePart + decimalPart) * NeighboringBeeCountUpperBound[gameSize]);
};