import { useMemo, useCallback } from 'react';
import { defineGrid, extendHex } from 'honeycomb-grid';
import * as R from 'ramda';
import { BEE_PROBABILITY, HIVE_DIMENSION } from '../constants/constants';
import { HiveCellHex } from '../classes/HiveCellHex';
import { getPrimitiveHexId } from '../utils/getPrimitiveHexId';
import { mapIndexed } from '../utils/mapIndexed';

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

        const hiveCellsById = R.o(
            R.reduce((accumulatedHiveCellsById, cell) => ({
                ...accumulatedHiveCellsById,
                [cell.id]: cell,
            }), {}),
            mapIndexed((primitiveHex, index) => {
                const cell = new HiveCellHex(primitiveHex, index);

                cell.setIsBee(Math.random() <= BEE_PROBABILITY);
                cell.setCellSize(getCellSize(hiveSize));

                return cell;
            }),
        )(grid);

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
    }, [HexFactory, hiveSize]);
    
    return { generateGrid };
};
