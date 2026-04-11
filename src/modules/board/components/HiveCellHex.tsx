import React from 'react';
import { Image, Polygon, Text } from 'react-native-svg';
import { BEE, FLAG, type GameSizeValue } from 'hivesweeper/shared';
import { BeeHorizontalOffset } from '../utils/BeeHorizontalOffset';

type Props = {
  gameSize: GameSizeValue;
  cellSize: number;
  pointsString: string;
  isBee: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
  neighboringBees: number;
};

const HiveCellHex = React.memo(
  ({
    gameSize,
    cellSize,
    pointsString,
    isBee,
    isFlagged,
    isRevealed,
    neighboringBees,
  }: Props) => (
    <>
      <Polygon
        points={pointsString}
        fill={getFillColor(isBee, isRevealed, isFlagged)}
        stroke="orange"
        strokeWidth={2.5}
      />
      {isRevealed &&
        (isBee ? (
          <Image
            href={BEE}
            x={`${BeeHorizontalOffset[gameSize]}%`}
            y="1%"
            width={1.5 * cellSize}
            height={1.5 * cellSize}
          />
        ) : (
          <Text
            x={cellSize}
            y={1.2 * cellSize}
            textAnchor="middle"
            fill="brown"
            fontSize={cellSize}
            fontWeight="bold"
          >
            {neighboringBees}
          </Text>
        ))}
      {isFlagged && (
        <Image
          href={FLAG}
          x={`${BeeHorizontalOffset[gameSize]}%`}
          y="1%"
          width={1.5 * cellSize}
          height={1.5 * cellSize}
        />
      )}
    </>
  ),
);

const fillColors = {
  normal: 'yellow',
  revealed: 'gold',
  bee: 'firebrick',
  flagged: 'goldenrod',
};

const getFillColor = (
  isBee: boolean,
  isRevealed: boolean,
  isFlagged: boolean,
): string => {
  if (isRevealed) return isBee ? fillColors.bee : fillColors.revealed;
  if (isFlagged) return fillColors.flagged;
  return fillColors.normal;
};

export default HiveCellHex;
