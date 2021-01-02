import { useMemo, useCallback } from 'react';
import { defineGrid, extendHex } from 'honeycomb-grid';
import * as R from 'ramda';
import {
    HIVE_DIMENSION,
    MINIMUM_BEE_COUNT,
    BEE_PROBABILITY,
    MAXIMUM_NEIGHBORING_BEE_COUNT,
} from '../constants/Constants';
import { HiveCellHex } from '../classes/HiveCellHex';
import { getPrimitiveHexId } from '../utils/getPrimitiveHexId';
import { mapIndexed } from '../utils/mapIndexed';
import randomSubset from '../utils/randomSubset';

const getCellSize = (hiveSize) => HIVE_DIMENSION.WIDTH / (1.5 * hiveSize + 2);

export const useHiveGridFactory = (hiveSize) => {
    const HexFactory = useMemo(() => extendHex({
        size: getCellSize(hiveSize),
        orientation: 'flat',
    }), [hiveSize]);
    
    const generateGrid = useCallback(() => {
        const GridFactory = defineGrid(HexFactory);

        const grid = GridFactory.hexagon({
            radius: hiveSize / 2,
            center: [hiveSize / 2, hiveSize / 2],
        });

        let beeCount = 0;

        const hiveCellsById = R.o(
            // map by hex ID to allow neighbor mapping
            R.reduce((accumulatedHiveCellsById, cell) => ({
                ...accumulatedHiveCellsById,
                [cell.id]: cell,
            }), {}),
            // generate bees
            mapIndexed((primitiveHex, index) => {
                const cell = new HiveCellHex(primitiveHex, index);

                const isBee = beeCount < MINIMUM_BEE_COUNT || Math.random() <= BEE_PROBABILITY;
                cell.setIsBee(isBee);
                if (isBee) {
                    beeCount += 1;
                }

                cell.setCellSize(getCellSize(hiveSize));

                return cell;
            }),
        )(grid);

        return R.compose(
            // limit maximum neighboring bee count
            R.forEach((cell) => {
                if (cell.neighboringBees <= MAXIMUM_NEIGHBORING_BEE_COUNT) {
                    return;
                }

                const limitExceededBy = cell.neighboringBees - MAXIMUM_NEIGHBORING_BEE_COUNT;

                R.compose(
                    R.forEach((neighbor) => {
                        neighbor.setIsBee(false);

                        R.forEach((neighborOfNeighbor) => {
                            neighborOfNeighbor.setNeighboringBees(neighborOfNeighbor.neighboringBees - 1);
                        })(neighbor.neighbors);
                    }),
                    randomSubset(limitExceededBy),
                    R.filter(R.prop('isBee')),
                )(cell.neighbors);
            }),
            // map neighbors
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
    }, [HexFactory, hiveSize]);
    
    return { generateGrid };
};
