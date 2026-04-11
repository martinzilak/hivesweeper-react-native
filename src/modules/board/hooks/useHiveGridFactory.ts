import { useCallback } from 'react';
import { getNewGrid , limitBigBeeNeighborhoods , guaranteeBeeCountLowerBound } from 'hivesweeper/grid';
import type { GameSizeValue, HiveGrid } from 'hivesweeper/shared';

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
