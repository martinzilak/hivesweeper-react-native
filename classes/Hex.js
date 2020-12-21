import { getPrimitiveHexId } from '../utils/getPrimitiveHexId';
import { getPointsStringFromPrimitiveHex } from '../utils/getPointsStringFromPrimitiveHex';

export class Hex {
    constructor(hex, index = 0) {
        this.primitiveHex = hex;
        this.id = getPrimitiveHexId(hex);
        this.index = index;
        this.pointsString = getPointsStringFromPrimitiveHex(hex);
        const { x, y } = hex.toPoint();
        this.x = x;
        this.y = y;
        this.isBee = false;
        this.isFlagged = false;
        this.isRevealed = false;
        this.neighbors = [];
        this.neighboringBees = 0;
    };

    setIsBee(isBee) {
        this.isBee = isBee;
    };

    setIsFlagged(isFlagged) {
        this.isFlagged = isFlagged;
    };

    setIsRevealed(isRevealed) {
        this.isRevealed = isRevealed;
    };

    setNeighbors(neighbors) {
        this.neighbors = neighbors;
    };

    setNeighboringBees(neighboringBees) {
        this.neighboringBees = neighboringBees;
    };
};
