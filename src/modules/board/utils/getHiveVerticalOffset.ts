import { HiveDimension , HiveVerticalOffsetPadding ,type  GameSizeValue } from 'hivesweeper/shared';
import { getHexHeight } from 'hivesweeper/grid';

export const getHiveVerticalOffset = (gameSize: GameSizeValue): number =>
  (HiveDimension.HEIGHT - ((gameSize + 1 + HiveVerticalOffsetPadding[gameSize]) * getHexHeight(gameSize))) / 2;
