import { Stat } from './Stat';
import type { Stats } from '../types/game';

export const DefaultStats: Stats = Object.values(Stat).reduce<Stats>(
  (stats, nextStat) => ({ ...stats, [nextStat.key]: 0 }),
  {},
);
