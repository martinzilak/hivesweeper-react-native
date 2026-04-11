import { useCallback } from 'react';
import { getNewGrid } from '../utils/gridUtils/getNewGrid';
import { limitBigBeeNeighborhoods } from '../utils/limitBigBeeNeighborhoods';
import { guaranteeBeeCountLowerBound } from '../utils/guaranteeBeeCountLowerBound';
import type { GameSizeValue, HiveGrid } from '../types/game';

export const useHiveGridFactory = (gameSize: GameSizeValue) => {
  const generateHiveGrid = useCallback(
    (): HiveGrid => {
      const grid = getNewGrid(gameSize);
      const grid1 = limitBigBeeNeighborhoods(gameSize, 1)(grid);
      const grid2 = limitBigBeeNeighborhoods(gameSize, 2)(grid1);
      return guaranteeBeeCountLowerBound(gameSize)(grid2);
    },
    [gameSize],
  );

  return { generateHiveGrid };
};
