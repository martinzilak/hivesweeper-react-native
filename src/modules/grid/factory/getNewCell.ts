import { getPointsStringFromPrimitiveHex } from '../geometry/getPointsStringFromPrimitiveHex';
import { getPrimitiveHexId } from '../geometry/getPrimitiveHexId';
import type { HiveCell, PrimitiveHex } from 'hivesweeper/shared';

export const getNewCell = (
  hex: PrimitiveHex,
  isBee: boolean,
  cellSize: number,
): HiveCell => {
  const { x, y } = hex.toPoint();

  return {
    primitiveHex: hex,
    id: getPrimitiveHexId(hex),
    pointsString: getPointsStringFromPrimitiveHex(hex),
    x,
    y,
    cellSize,
    isBee,
    isFlagged: false,
    isRevealed: false,
    neighborIds: [],
    neighboringBees: 0,
  };
};
