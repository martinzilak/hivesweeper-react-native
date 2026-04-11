import * as R from 'ramda';
import { Stat } from './Stat';
import type { Stats } from '../types/game';

export const DefaultStats: Stats = R.o(
  R.reduce((stats: Stats, nextStat: { key: string }) => ({
    ...stats,
    [nextStat.key]: 0,
  }), {}),
  (obj: typeof Stat) => R.values(obj),
)(Stat);