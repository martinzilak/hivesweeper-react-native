import { getNewGrid } from './getNewGrid';
import { limitBigBeeNeighborhoods } from './limitBigBeeNeighborhoods';
import { guaranteeBeeCountLowerBound } from './guaranteeBeeCountLowerBound';
import type { GameSizeValue, HiveGrid } from 'hivesweeper/shared';

export const generateGrid = (gameSize: GameSizeValue): HiveGrid => {
  const grid = getNewGrid(gameSize);
  const grid1 = limitBigBeeNeighborhoods(gameSize, 1)(grid);
  const grid2 = limitBigBeeNeighborhoods(gameSize, 2)(grid1);
  return guaranteeBeeCountLowerBound(gameSize)(grid2);
};
