import { GameSize ,type  GameSizeValue } from 'hivesweeper/shared';

export const NeighboringBeeCountUpperBound: Record<GameSizeValue, number> = {
  [GameSize.SMALL]: 2,
  [GameSize.MEDIUM]: 3,
  [GameSize.LARGE]: 4,
};
