import * as R from 'ramda';
import { ExtraBeeProbability } from '../../constants/ExtraBeeProbability';
import { GridFactory } from '../../constants/GridFactory';
import { TotalBeeCount } from '../../constants/TotalBeeCount';
import { getNewCell } from '../cellUtils/getNewCell';
import { getHexSize } from '../getHexSize';
import { getPrimitiveHexId } from '../getPrimitiveHexId';
import { randomSubset } from '../randomSubset';
import { getNeighborsOfCellWithId } from './getNeighborsOfCellWithId';

export const getNewGrid = (gameSize) => {
    const primitiveGrid = GridFactory[gameSize]();
    const cellSize = getHexSize(gameSize);
    let beeCount = 0;

    return R.compose(
        // map neighbors and neighboring bee count
        (intermediateGrid) => {
            R.forEach((cell) => {
                cell.neighborIds = R.o(
                    R.map(getPrimitiveHexId),
                    R.reject(R.isNil),
                )(primitiveGrid.neighborsOf(cell.primitiveHex));
            })(intermediateGrid);

            const grid = R.reduce((accumulatedGrid, cell) => ({
                ...accumulatedGrid,
                [cell.id]: cell,
            }), {})(intermediateGrid);

            R.o(
                R.forEach((cell) => {
                    if (!cell.isBee) {
                        return;
                    }

                    R.forEach((neighbor) => {
                        neighbor.neighboringBees += 1;
                    })(getNeighborsOfCellWithId(grid, cell.id));
                }),
                R.values,
            )(grid);

            return grid;
        },
        // generate cells and bees
        R.map((primitiveHex) => {
            const isBee = (
                beeCount < TotalBeeCount[gameSize].upperBound && (
                    beeCount < TotalBeeCount[gameSize].lowerBound ||
                    Math.random() <= ExtraBeeProbability[gameSize]
                )
            );
            beeCount += isBee ? 1 : 0;

            return getNewCell(primitiveHex, isBee, cellSize);
        }),
        // shuffle the grid
        randomSubset(R.length(primitiveGrid)),
    )(primitiveGrid);
};
