import React from 'react';
import PropTypes from 'prop-types';
import { G, Polygon, Image, Text } from 'react-native-svg';
import { BEE, FLAG } from '../assets/Images';
import { BeeHorizontalOffset } from '../constants/BeeHorizontalOffset';

const HiveCell = ({ gameSize, hex, revealCell, flagCell }) => {
    const { x, y, cellSize, pointsString, isBee, isFlagged, isRevealed, neighboringBees } = hex;

    return (
        <G
            x={x}
            y={y}
            onPress={() => revealCell(hex)}
            onLongPress={() => flagCell(hex)}
        >
            <Polygon
                points={pointsString}
                fill={getFillColor(isBee, isRevealed, isFlagged)}
                {...polygonStyles}
            />
            {isRevealed && (
                isBee ? (
                    <Image
                        {...getImageStyles(gameSize, cellSize)}
                        href={BEE}
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
                    {...getImageStyles(gameSize, cellSize)}
                    href={FLAG}
                />
            )}
        </G>
    );
};

HiveCell.propTypes = {
    gameSize: PropTypes.number,
    hex: PropTypes.object,
    revealCell: PropTypes.func,
    flagCell: PropTypes.func,
};

const polygonStyles = {
    stroke: 'orange',
    strokeWidth: 2,
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