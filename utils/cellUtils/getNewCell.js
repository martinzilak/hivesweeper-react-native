import { getPointsStringFromPrimitiveHex } from '../getPointsStringFromPrimitiveHex';
import { getPrimitiveHexId } from '../getPrimitiveHexId';

export const getNewCell = (hex, isBee, cellSize) => {
    const { x, y } = hex.toPoint();

    return {
        primitiveHex: hex,
        id: getPrimitiveHexId(hex),
        pointsString: getPointsStringFromPrimitiveHex(hex),
        x: x,
        y: y,
        cellSize,
        isBee,
        isFlagged: false,
        isRevealed: false,
        neighborIds: [],
        neighboringBees: 0,
    };
};
