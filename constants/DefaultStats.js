import * as R from 'ramda';
import { Stats } from './Stats';

export const DefaultStats = R.o(
    R.reduce((stats, nextStat) => ({
        ...stats,
        [nextStat.key]: 0,
    }), {}),
    R.values,
)(Stats);
