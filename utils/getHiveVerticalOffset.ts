import { HiveDimension } from '../constants/HiveDimension';
import { HiveVerticalOffsetPadding } from '../constants/HiveVerticalOffsetPadding';
import { getHexHeight } from './getHexHeight';
import type { GameSizeValue } from '../types/game';

export const getHiveVerticalOffset = (gameSize: GameSizeValue): number =>
  (HiveDimension.HEIGHT - ((gameSize + 1 + HiveVerticalOffsetPadding[gameSize]) * getHexHeight(gameSize))) / 2;