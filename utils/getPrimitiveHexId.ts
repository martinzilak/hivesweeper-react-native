import type { PrimitiveHex } from '../types/game';

export const getPrimitiveHexId = (primitiveHex: PrimitiveHex): string =>
  `hex-${primitiveHex.x}-${primitiveHex.y}`;