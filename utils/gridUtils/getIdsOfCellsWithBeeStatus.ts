import * as R from 'ramda';
import type { HiveCell, HiveGrid } from '../../types/game';

export const getIdsOfCellsWithBeeStatus = (grid: HiveGrid, isBee = true): string[] =>
  R.compose(
    R.pluck('id'),
    R.filter((cell: HiveCell) => cell.isBee === isBee),
    R.values,
  )(grid) as string[];