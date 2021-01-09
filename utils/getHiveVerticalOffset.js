import { HiveDimension } from '../constants/HiveDimension';
import { HiveVerticalOffsetPadding } from '../constants/HiveVerticalOffsetPadding';
import { getHexHeight } from './getHexHeight';

export const getHiveVerticalOffset = (gameSize) => (
    (HiveDimension.HEIGHT - ((gameSize + 1 + HiveVerticalOffsetPadding[gameSize]) * getHexHeight(gameSize))) / 2
);
