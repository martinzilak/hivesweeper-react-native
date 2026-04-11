import { TotalBeeCount } from '../constants/TotalBeeCount';
import { getIdsOfCellsWithBeeStatus } from './gridUtils/getIdsOfCellsWithBeeStatus';
import { setBeeStatus } from './gridUtils/setBeeStatus';
import { randomSubset } from './randomSubset';
import type { GameSizeValue, HiveGrid } from '../types/game';

export const guaranteeBeeCountLowerBound =
  (gameSize: GameSizeValue) =>
  (grid: HiveGrid): HiveGrid => {
    const notBeeIds = getIdsOfCellsWithBeeStatus(grid, false);
    const beeCount = Object.keys(grid).length - notBeeIds.length;

    if (beeCount >= TotalBeeCount[gameSize].lowerBound) return grid;

    const limitUndercutBy = TotalBeeCount[gameSize].lowerBound - beeCount;
    return setBeeStatus(grid, randomSubset(limitUndercutBy)(notBeeIds), true);
  };
