import {
  getPointsStringFromCorners,
  type PrimitiveHex,
} from 'hivesweeper/shared';

export const getPointsStringFromPrimitiveHex = (hex: PrimitiveHex): string =>
  getPointsStringFromCorners(hex.corners());
