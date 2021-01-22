import React from 'react';
import PropTypes from 'prop-types';
import { G, Polygon, Image, Text } from 'react-native-svg';
import { BEE, FLAG } from '../assets/Images';
import { BeeHorizontalOffset } from '../constants/BeeHorizontalOffset';
import { useVibrate } from '../hooks/useVibrate';

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
            <Polygon
                points={pointsString}
                fill={getFillColor(isBee, isRevealed, isFlagged)}
                {...polygonStyles}
            />
            {true && (
                isBee ? (
                    <Image
                        href={BEE}
                        {...getImageStyles(gameSize, cellSize)}
                    />
                ) : (
                    <Text
                        x={cellSize}
                        y={1.2 * cellSize}
                        textAnchor="middle"
                        {...getTextStyles(cellSize)}
                    >
                        {neighboringBees}
                    </Text>
                )
            )}
            {isFlagged && (
                <Image
                    href={FLAG}
                    {...getImageStyles(gameSize, cellSize)}
                />
            )}
        </G>
    );
});

HiveCell.propTypes = {
    gameSize: PropTypes.number,
    cell: PropTypes.object,
    revealCell: PropTypes.func,
    flagCell: PropTypes.func,
};

const polygonStyles = {
    stroke: 'orange',
    strokeWidth: 2.5,
};

const getImageStyles = (gameSize, cellSize) => ({
    x: `${BeeHorizontalOffset[gameSize]}%`,
    y: '1%',
    width: 1.5 * cellSize,
    height: 1.5 * cellSize,
});

const getTextStyles = (cellSize) => ({
    fill: 'brown',
    fontSize: cellSize,
    fontWeight: 'bold',
});

const fillColors = {
    normal: 'yellow',
    revealed: 'gold',
    bee: 'firebrick',
    flagged: 'goldenrod',
};

const getFillColor = (isBee, isRevealed, isFlagged) => {
    if (isRevealed) {
        return isBee ? fillColors.bee : fillColors.revealed;
    }
    if (isFlagged) {
        return fillColors.flagged;
    }
    return fillColors.normal;
};

export default HiveCell;