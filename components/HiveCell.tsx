import React from 'react';
import { G } from 'react-native-svg';
import { PRESS, LONG_PRESS } from '../assets/Sounds';
import { usePlaySound } from '../hooks/usePlaySound';
import { useVibrate } from '../hooks/useVibrate';
import HiveCellHex from './HiveCellHex';
import type { GameSizeValue, HiveCell as HiveCellType } from '../types/game';

type Props = {
  gameSize: GameSizeValue;
  cell: HiveCellType;
  revealCell: (cell: HiveCellType) => void;
  flagCell: (cell: HiveCellType) => void;
};

const HiveCell = ({ gameSize, cell, revealCell, flagCell }: Props) => {
  const { x, y, cellSize, pointsString, isBee, isFlagged, isRevealed, neighboringBees } = cell;
  const { playSound } = usePlaySound();
  const { vibrate } = useVibrate();

  return (
    <G
      x={x}
      y={y}
      onPress={() => { playSound(PRESS); revealCell(cell); }}
      onLongPress={() => { playSound(LONG_PRESS); vibrate(); flagCell(cell); }}
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