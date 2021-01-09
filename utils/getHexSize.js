import { HiveDimension } from '../constants/HiveDimension';

export const getHexSize = (gameSize) => (
    HiveDimension.WIDTH / (1.5 * gameSize + 2)
);
