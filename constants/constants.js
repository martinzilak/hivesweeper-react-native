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
    SMALL: 6,
    MEDIUM: 8,
    LARGE: 10,
};

export const BEE_X_OFFSET = {
    [HIVE_SIZE.SMALL]: 2.5,
    [HIVE_SIZE.MEDIUM]: 2,
    [HIVE_SIZE.LARGE]: 1.5,
};

export const BEE_PROBABILITY = 0.33;

export const SCORE = {
    REVEAL_PLAYER: 3,
    REVEAL_AUTOMATIC: 1,
    FLAG: 2,
};

export const SCREEN = {
    MAIN_MENU: 'MainMenuScreen',
    NEW_GAME_SIZE: 'NewGameSizeScreen',
    GAME: 'GameScreen',
    PAUSE_MENU: 'PauseMenuScreen',
};
