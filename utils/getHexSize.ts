import { HiveDimension } from '../constants/HiveDimension';
import type { GameSizeValue } from '../types/game';

export const getHexSize = (gameSize: GameSizeValue): number =>
  HiveDimension.WIDTH / (1.5 * gameSize + 2);