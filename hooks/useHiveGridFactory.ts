import { useCallback } from 'react';
import * as R from 'ramda';
import { getNewGrid } from '../utils/gridUtils/getNewGrid';
import { limitBigBeeNeighborhoods } from '../utils/limitBigBeeNeighborhoods';
import { guaranteeBeeCountLowerBound } from '../utils/guaranteeBeeCountLowerBound';
import type { GameSizeValue, HiveGrid } from '../types/game';

export const useHiveGridFactory = (gameSize: GameSizeValue) => {
  const generateHiveGrid = useCallback(
    (): HiveGrid =>
      R.compose(
        guaranteeBeeCountLowerBound(gameSize),
        limitBigBeeNeighborhoods(gameSize, 2),
        limitBigBeeNeighborhoods(gameSize, 1),
      )(getNewGrid(gameSize)),
    [gameSize],
  );

  return { generateHiveGrid };
};