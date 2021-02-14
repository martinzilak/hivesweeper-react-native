import { useCallback } from 'react';
import * as R from 'ramda';
import { getNewGrid } from '../utils/gridUtils/getNewGrid';
import { limitBigBeeNeighborhoods } from '../utils/limitBigBeeNeighborhoods';
import { guaranteeBeeCountLowerBound } from '../utils/guaranteeBeeCountLowerBound';

export const useHiveGridFactory = (gameSize) => {
    const generateHiveGrid = useCallback(() => R.compose(
        guaranteeBeeCountLowerBound(gameSize),
        limitBigBeeNeighborhoods(gameSize, 2),
        limitBigBeeNeighborhoods(gameSize, 1),
    )(getNewGrid(gameSize)), [gameSize]);
    
    return { generateHiveGrid };
};
