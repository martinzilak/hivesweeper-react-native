import { GameSize } from './GameSize';
import type { GameSizeValue } from '../types/game';

export const NeighboringBeeCountUpperBound: Record<GameSizeValue, number> = {
  [GameSize.SMALL]: 2,
  [GameSize.MEDIUM]: 3,
  [GameSize.LARGE]: 4,
};