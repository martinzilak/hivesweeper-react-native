import { getPointsStringFromCorners } from './getPointsStringFromCorners';

export const getPointsStringFromPrimitiveHex = (hex) => getPointsStringFromCorners(hex.corners());
