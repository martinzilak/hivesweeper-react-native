import { useCallback } from 'react';
import * as R from 'ramda';
import { HiveCellHex } from '../classes/HiveCellHex';
import { getHexSize } from '../utils/getHexSize';
import { getPrimitiveHexId } from '../utils/getPrimitiveHexId';
import { limitBigBeeNeighborhoods } from '../utils/limitBigBeeNeighborhoods';
import { guaranteeBeeCountLowerBound } from '../utils/guaranteeBeeCountLowerBound';
import { mapIndexed } from '../utils/mapIndexed';
import { randomSubset } from '../utils/randomSubset';
import { GridFactory } from '../constants/GridFactory';
import { ExtraBeeProbability } from '../constants/ExtraBeeProbability';
import { TotalBeeCount } from '../constants/TotalBeeCount';

export const useHiveGridFactory = (gameSize) => {
    const generateGrid = useCallback(() => {
        const grid = GridFactory[gameSize]();

        let beeCount = 0;
        const cellSize = getHexSize(gameSize);

        return R.compose(
            guaranteeBeeCountLowerBound(gameSize),
            limitBigBeeNeighborhoods(gameSize, 2),
            limitBigBeeNeighborhoods(gameSize, 1),
            // map neighbors
            (hiveCellsById) => {
                return R.o(
                    R.map((cell) => {
                        const neighbors = R.o(
                            R.map((neighbor) => hiveCellsById[getPrimitiveHexId(neighbor)]),
                            R.filter((neighbor) => !R.isNil(neighbor)),
                        )(grid.neighborsOf(cell.primitiveHex));

                        cell.setNeighbors(neighbors);
                        cell.setNeighboringBees(R.o(
                            R.length,
                            R.filter(R.prop('isBee')),
                        )(neighbors));

                        return cell;
                    }),
                    R.values,
                )(hiveCellsById);
            },
            // map by hex ID to allow neighbor mapping
            R.reduce((accumulatedHiveCellsById, cell) => ({
                ...accumulatedHiveCellsById,
                [cell.id]: cell,
            }), {}),
            // generate bees
            mapIndexed((primitiveHex, index) => {
                const cell = new HiveCellHex(primitiveHex, index);

                if (beeCount < TotalBeeCount[gameSize].upperBound &&
                    (beeCount < TotalBeeCount[gameSize].lowerBound || Math.random() <= ExtraBeeProbability[gameSize])
                ) {
                    cell.setIsBee(true);
                    beeCount += 1;
                }

                cell.setCellSize(cellSize);

                return cell;
            }),
            // shuffle the grid
            randomSubset(grid.length),
        )(grid);
    }, [gameSize]);
    
    return { generateGrid };
};
