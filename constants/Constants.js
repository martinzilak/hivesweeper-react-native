import { Dimensions } from 'react-native';

export const SCREEN_DIMENSION = {
    WIDTH: Dimensions.get('screen').width,
    HEIGHT: Dimensions.get('screen').height,
};

export const HIVE_DIMENSION = {
    WIDTH: Math.floor(0.9 * SCREEN_DIMENSION.WIDTH),
    HEIGHT: Math.floor(1.1 * SCREEN_DIMENSION.WIDTH),
};

export const HIVE_SIZE = {
    SMALL: 4,
    MEDIUM: 6,
    LARGE: 8,
};

export const BEE_X_OFFSET = {
    [HIVE_SIZE.SMALL]: 3.5,
    [HIVE_SIZE.MEDIUM]: 2.5,
    [HIVE_SIZE.LARGE]: 2,
};

export const HIVE_Y_OFFSET = {
    [HIVE_SIZE.SMALL]: 25,
    [HIVE_SIZE.MEDIUM]: -5,
    [HIVE_SIZE.LARGE]: 20,
};

export const BEE_PROBABILITY = 0.3;

export const SCORE = {
    REVEAL_PLAYER: 3,
    REVEAL_AUTOMATIC: 1,
    FLAG: 2,
};

export const SCREEN = {
    MAIN_MENU: 'MainMenuScreen',
    NEW_GAME_SIZE: 'NewGameSizeScreen',
    GAME: 'GameScreen',
};

export const MINIMUM_BEE_COUNT = 2;

export const MAXIMUM_NEIGHBORING_BEE_COUNT = 3;
