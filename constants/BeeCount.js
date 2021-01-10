import { GameSize } from './GameSize';

export const BeeCount = {
    [GameSize.SMALL]: { lowerBound: 6, upperBound: 8 },
    [GameSize.MEDIUM]: { lowerBound: 12, upperBound: 16 },
    [GameSize.LARGE]: { lowerBound: 16, upperBound: 22 },
};
