import { GameSize } from './GameSize';

export const BeeCount = {
    [GameSize.SMALL]: { lowerBound: 7, upperBound: 8 },
    [GameSize.MEDIUM]: { lowerBound: 12, upperBound: 14 },
    [GameSize.LARGE]: { lowerBound: 15, upperBound: 20 },
};
