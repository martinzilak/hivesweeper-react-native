import * as R from 'ramda';

export const getPointsStringFromCorners = R.o(
  R.join(' '),
  R.map(({ x, y }: { x: number; y: number }) => `${x},${y}`),
);