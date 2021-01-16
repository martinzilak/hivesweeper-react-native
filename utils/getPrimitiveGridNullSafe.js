import * as R from 'ramda';

export const getPrimitiveGridNullSafe = (hiveGrid) => R.values(hiveGrid?.grid ?? {});
