import * as R from 'ramda';
import { Stats } from './Stats';

export const DefaultStats = R.reduce((stats, nextStat) => ({
    ...stats,
    [nextStat.key]: 0,
}), {})(Stats);
