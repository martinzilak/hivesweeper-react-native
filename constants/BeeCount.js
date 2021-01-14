import { GameSize } from './GameSize';

export const BeeCount = {
    [GameSize.SMALL]: { lowerBound: 5, upperBound: 8 },
    [GameSize.MEDIUM]: { lowerBound: 8, upperBound: 14 },
    [GameSize.LARGE]: { lowerBound: 14, upperBound: 20 },
};
