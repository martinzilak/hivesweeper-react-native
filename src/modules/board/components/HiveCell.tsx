import React from 'react';
import { G } from 'react-native-svg';
import {
  PRESS,
  LONG_PRESS,
  usePlaySound,
  useVibrate,
  type GameSizeValue,
  type HiveCell as HiveCellType,
} from 'hivesweeper/shared';
import { useGameStore } from 'hivesweeper/game';
import HiveCellHex from './HiveCellHex';

type Props = {
  gameSize: GameSizeValue;
  cell: HiveCellType;
};

const HiveCell = ({ gameSize, cell }: Props) => {
  const {
    x,
    y,
    cellSize,
    pointsString,
    isBee,
    isFlagged,
    isRevealed,
    neighboringBees,
  } = cell;
  const { playSound } = usePlaySound();
  const { vibrate } = useVibrate();
  const revealCell = useGameStore((s) => s.revealCell);
  const flagCell = useGameStore((s) => s.flagCell);

  return (
    <G
      x={x}
      y={y}
      onPress={() => {
        playSound(PRESS);
        revealCell(cell.id);
      }}
      onLongPress={() => {
        playSound(LONG_PRESS);
        vibrate();
        flagCell(cell.id);
      }}
    >
      <HiveCellHex
        gameSize={gameSize}
        cellSize={cellSize}
        pointsString={pointsString}
        isBee={isBee}
        isFlagged={isFlagged}
        isRevealed={isRevealed}
        neighboringBees={neighboringBees}
      />
    </G>
  );
};

export default HiveCell;
