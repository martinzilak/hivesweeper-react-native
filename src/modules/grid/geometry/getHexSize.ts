import { HiveDimension ,type  GameSizeValue } from 'hivesweeper/shared';

export const getHexSize = (gameSize: GameSizeValue): number =>
  HiveDimension.WIDTH / (1.5 * gameSize + 2);
