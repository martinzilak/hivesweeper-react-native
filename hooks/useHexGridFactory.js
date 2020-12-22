import { useMemo, useCallback } from 'react';
import { defineGrid, extendHex } from 'honeycomb-grid';
import * as R from 'ramda';
import { BEE_PROBABILITY, HIVE_DIMENSION } from '../constants/constants';
import { Hex } from '../classes/Hex';
import { getPrimitiveHexId } from '../utils/getPrimitiveHexId';
import { mapIndexed } from '../utils/mapIndexed';

const getCellSize = (hiveSize) => HIVE_DIMENSION.WIDTH / (1.5 * hiveSize + 2);

export const useHexGridFactory = (size) => {
    const HexFactory = useMemo(() => extendHex({
        size: getCellSize(size),
        orientation: 'flat',
    }), [size]);
    
    const generateGrid = useCallback(() => {
        const GridFactory = defineGrid(HexFactory);

        const grid = GridFactory.hexagon({
            radius: size / 2,
            center: [size / 2, size / 2],
        });

        const hexesById = R.o(
            R.reduce((accumulatedHexesById, hex) => ({
                ...accumulatedHexesById,
                [hex.id]: hex,
            }), {}),
            mapIndexed((primitiveHex, index) => {
                const hex = new Hex(primitiveHex, index);

                hex.setIsBee(Math.random() <= BEE_PROBABILITY);
                hex.setCellSize(getCellSize(size));

                return hex;
            }),
        )(grid);

        return R.o(
            R.map((hex) => {
                const neighbors = R.o(
                    R.map((neighbor) => hexesById[getPrimitiveHexId(neighbor)]),
                    R.filter((neighbor) => !R.isNil(neighbor)),
                )(grid.neighborsOf(hex.primitiveHex));

                hex.setNeighbors(neighbors);
                hex.setNeighboringBees(R.o(
                    R.length,
                    R.filter(R.prop('isBee')),
                )(neighbors));

                return hex;
            }),
            R.values,
        )(hexesById);
    }, [HexFactory, size]);
    
    return { HexFactory, generateGrid };
};
