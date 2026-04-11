import * as R from 'ramda';

export const getCellCountForWidth = (width: number): number =>
  1 + (R.o(R.sum, R.map(R.multiply(6)))(R.range(1, width + 1)) as number);