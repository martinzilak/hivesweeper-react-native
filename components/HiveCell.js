import React from 'react';
import { G } from 'react-native-svg';
import PropTypes from 'prop-types';
import { PRESS, LONG_PRESS } from '../assets/Sounds';
import { usePlaySound } from '../hooks/usePlaySound';
import { useVibrate } from '../hooks/useVibrate';
import HiveCellHex from './HiveCellHex';

const HiveCell = ({ gameSize, cell, revealCell, flagCell }) => {
    const { x, y, cellSize, pointsString, isBee, isFlagged, isRevealed, neighboringBees } = cell;
    const { playSound } = usePlaySound();
    const { vibrate } = useVibrate();

    return (
        <G
            x={x}
            y={y}
            onPress={() => {
                playSound(PRESS);
                revealCell(cell);
            }}
            onLongPress={() => {
                playSound(LONG_PRESS);
                vibrate();
                flagCell(cell);
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

HiveCell.propTypes = {
    gameSize: PropTypes.number,
    cell: PropTypes.object,
    revealCell: PropTypes.func,
    flagCell: PropTypes.func,
};

export default HiveCell;
