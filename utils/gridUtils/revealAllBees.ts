import * as R from 'ramda';
import type { HiveCell, HiveGrid } from '../../types/game';

export const revealAllBees = (grid: HiveGrid): HiveGrid =>
  R.map((cell: HiveCell) => {
    if (!cell.isBee) return cell;
    return { ...cell, isFlagged: false, isRevealed: true };
  })(grid);