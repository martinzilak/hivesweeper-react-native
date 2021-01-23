import React from 'react';
import PropTypes from 'prop-types';
import { G } from 'react-native-svg';
import { useVibrate } from '../hooks/useVibrate';
import HiveCellHex from './HiveCellHex';

const HiveCell = React.memo(({ gameSize, cell, revealCell, flagCell }) => {
    const { x, y, cellSize, pointsString, isBee, isFlagged, isRevealed, neighboringBees } = cell;
    const { vibrate } = useVibrate();

    return (
        <G
            x={x}
            y={y}
            onPress={() => {
                revealCell(cell);
                vibrate();
            }}
            onLongPress={() => {
                flagCell(cell);
                vibrate();
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
});

HiveCell.propTypes = {
    gameSize: PropTypes.number,
    cell: PropTypes.object,
    revealCell: PropTypes.func,
    flagCell: PropTypes.func,
};

export default HiveCell;
