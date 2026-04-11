import { GameSize } from './GameSize';
import type { GameSizeValue } from '../types/game';

export const HiveVerticalOffsetPadding: Record<GameSizeValue, number> = {
  [GameSize.SMALL]: 0,
  [GameSize.MEDIUM]: 1,
  [GameSize.LARGE]: 0,
};
