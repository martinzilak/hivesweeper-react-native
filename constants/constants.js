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
    SMALL: 8,
    MEDIUM: 10,
    LARGE: 12,
};

export const BEE_PROBABILITY = 0.2;
