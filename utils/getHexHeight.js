import { getHexSize } from './getHexSize';

const SQRT_OF_3 = Math.sqrt(3);

export const getHexHeight = (gameSize) => SQRT_OF_3 * getHexSize(gameSize);
