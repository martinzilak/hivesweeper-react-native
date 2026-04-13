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
  flagMode?: boolean;
};

const HiveCell = ({ gameSize, cell, flagMode = false }: Props) => {
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
  
  const handleFlagCell = () => {
      playSound(LONG_PRESS);
      vibrate();
      flagCell(cell.id);
  };

  return (
    <G
      x={x}
      y={y}
      onPress={() => {
        if (flagMode) {
            handleFlagCell();
        } else {
          playSound(PRESS);
          revealCell(cell.id);
        }
      }}
      onLongPress={handleFlagCell}
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
