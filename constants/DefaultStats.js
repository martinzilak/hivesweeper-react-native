import * as R from 'ramda';
import { Stat } from './Stat';

export const DefaultStats = R.o(
    R.reduce((stats, nextStat) => ({
        ...stats,
        [nextStat.key]: 0,
    }), {}),
    R.values,
)(Stat);
