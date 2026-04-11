import { GameSize ,type  GameSizeValue } from 'hivesweeper/shared';

export const BeeHorizontalOffset: Record<GameSizeValue, number> = {
  [GameSize.SMALL]: 3.5,
  [GameSize.MEDIUM]: 2.5,
  [GameSize.LARGE]: 2,
};
