import { getHexSize } from './getHexSize';
import type { GameSizeValue } from 'hivesweeper/shared';

const SQRT_OF_3 = Math.sqrt(3);

export const getHexHeight = (gameSize: GameSizeValue): number =>
  SQRT_OF_3 * getHexSize(gameSize);
