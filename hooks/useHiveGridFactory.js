import { useCallback } from 'react';
import * as R from 'ramda';
import { HiveGrid } from '../classes/HiveGrid';
import { HiveCellHex } from '../classes/HiveCellHex';
import { getHexSize } from '../utils/getHexSize';
import { getPrimitiveHexId } from '../utils/getPrimitiveHexId';
import { limitBigBeeNeighborhoods } from '../utils/limitBigBeeNeighborhoods';
import { guaranteeBeeCountLowerBound } from '../utils/guaranteeBeeCountLowerBound';
import { randomSubset } from '../utils/randomSubset';
import { GridFactory } from '../constants/GridFactory';
import { ExtraBeeProbability } from '../constants/ExtraBeeProbability';
import { BeeCount } from '../constants/BeeCount';

export const useHiveGridFactory = (gameSize) => {
    const generateGrid = useCallback(() => {
        const primitiveGrid = GridFactory[gameSize]();

        const cellSize = getHexSize(gameSize);
        let beeCount = 0;

        return R.compose(
            guaranteeBeeCountLowerBound(gameSize),
            limitBigBeeNeighborhoods(gameSize, 2),
            limitBigBeeNeighborhoods(gameSize, 1),
            // map neighbors
            (intermediateGrid) => {
                R.forEach((cell) => {
                    const neighborIds = R.o(
                        R.map(getPrimitiveHexId),
                        R.reject(R.isNil),
                    )(primitiveGrid.neighborsOf(cell.primitiveHex));

                    cell.setNeighborIds(neighborIds);
                })(intermediateGrid);

                const grid = new HiveGrid(intermediateGrid);
                grid.calculateNeighborCount();

                return grid;
            },
            // generate cells and bees
            R.map((primitiveHex) => {
                const cell = new HiveCellHex(primitiveHex);

                if (beeCount < BeeCount[gameSize].upperBound &&
                    (beeCount < BeeCount[gameSize].lowerBound || Math.random() <= ExtraBeeProbability[gameSize])
                ) {
                    cell.setIsBee(true);
                    beeCount += 1;
                }

                cell.setCellSize(cellSize);

                return cell;
            }),
            // shuffle the grid
            randomSubset(R.length(primitiveGrid)),
        )(primitiveGrid);
    }, [gameSize]);
    
    return { generateGrid };
};
