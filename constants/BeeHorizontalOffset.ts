import { GameSize } from './GameSize';
import type { GameSizeValue } from '../types/game';

export const BeeHorizontalOffset: Record<GameSizeValue, number> = {
  [GameSize.SMALL]: 3.5,
  [GameSize.MEDIUM]: 2.5,
  [GameSize.LARGE]: 2,
};