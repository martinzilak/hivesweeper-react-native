import type { PrimitiveHex } from 'hivesweeper/shared';

export const getPrimitiveHexId = (primitiveHex: PrimitiveHex): string =>
  `hex-${primitiveHex.x}-${primitiveHex.y}`;
