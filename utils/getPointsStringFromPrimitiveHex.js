import * as R from 'ramda';

export const getPointsStringFromPrimitiveHex = (hex) => R.o(
    R.join(' '),
    R.map(({ x, y }) => `${x},${y}`),
)(hex.corners());
