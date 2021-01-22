import * as R from 'ramda';

export const getIdsOfCellsWithBeeStatus = (grid, isBee = true) => R.compose(
    R.pluck('id'),
    R.filter(R.propEq('isBee', isBee)),
    R.values,
)(grid);
