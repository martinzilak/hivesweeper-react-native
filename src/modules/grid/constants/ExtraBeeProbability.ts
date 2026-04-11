import { GameSize ,type  GameSizeValue } from 'hivesweeper/shared';

export const ExtraBeeProbability: Record<GameSizeValue, number> = {
  [GameSize.SMALL]: 0.05,
  [GameSize.MEDIUM]: 0.1,
  [GameSize.LARGE]: 0.15,
};
