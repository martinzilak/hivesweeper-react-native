import { GameSize, type GameSizeValue } from 'hivesweeper/shared';

export const TotalBeeCount: Record<
  GameSizeValue,
  { lowerBound: number; upperBound: number }
> = {
  [GameSize.SMALL]: { lowerBound: 5, upperBound: 8 },
  [GameSize.MEDIUM]: { lowerBound: 8, upperBound: 14 },
  [GameSize.LARGE]: { lowerBound: 14, upperBound: 20 },
};
