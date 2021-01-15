import { getPrimitiveHexId } from '../utils/getPrimitiveHexId';
import { getPointsStringFromPrimitiveHex } from '../utils/getPointsStringFromPrimitiveHex';

export class HiveCellHex {
    constructor(hex) {
        this.primitiveHex = hex;

        this.id = getPrimitiveHexId(hex);
        this.pointsString = getPointsStringFromPrimitiveHex(hex);

        const { x, y } = hex.toPoint();
        this.x = x;
        this.y = y;
        this.cellSize = 0;

        this.isBee = false;
        this.isFlagged = false;
        this.isRevealed = false;
        this.neighborIds = [];
        this.neighboringBees = 0;
    };

    setCellSize(cellSize) {
        this.cellSize = cellSize;
    }

    setIsBee(isBee) {
        this.isBee = isBee;
    };

    setIsFlagged(isFlagged) {
        this.isFlagged = isFlagged;
    };

    setIsRevealed(isRevealed) {
        this.isRevealed = isRevealed;
    };

    setNeighborIds(neighborIds) {
        this.neighborIds = neighborIds;
    };

    setNeighboringBees(neighboringBees) {
        this.neighboringBees = neighboringBees;
    };
};
