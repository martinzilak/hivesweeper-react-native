import { TotalBeeCount } from '../constants/TotalBeeCount';
import { getIdsOfCellsWithBeeStatus } from '../queries/getIdsOfCellsWithBeeStatus';
import { setBeeStatus } from '../mutations/setBeeStatus';
import { randomSubset } from './randomSubset';
import type { GameSizeValue, HiveGrid } from 'hivesweeper/shared';

export const guaranteeBeeCountLowerBound =
  (gameSize: GameSizeValue) =>
  (grid: HiveGrid): HiveGrid => {
    const notBeeIds = getIdsOfCellsWithBeeStatus(grid, false);
    const beeCount = Object.keys(grid).length - notBeeIds.length;

    if (beeCount >= TotalBeeCount[gameSize].lowerBound) return grid;

    const limitUndercutBy = TotalBeeCount[gameSize].lowerBound - beeCount;
    return setBeeStatus(grid, randomSubset(limitUndercutBy)(notBeeIds), true);
  };
