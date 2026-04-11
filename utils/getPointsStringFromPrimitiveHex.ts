import { getPointsStringFromCorners } from './getPointsStringFromCorners';
import type { PrimitiveHex } from '../types/game';

export const getPointsStringFromPrimitiveHex = (hex: PrimitiveHex): string =>
  getPointsStringFromCorners(hex.corners());