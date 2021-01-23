import React from 'react';
import { Image, Polygon, Text } from 'react-native-svg';
import PropTypes from 'prop-types';
import { BEE, FLAG } from '../assets/Images';
import { BeeHorizontalOffset } from '../constants/BeeHorizontalOffset';

const HiveCellHex = React.memo(({
    gameSize,
    cellSize,
    pointsString,
    isBee,
    isFlagged,
    isRevealed,
    neighboringBees,
}) => (
    <>
        <Polygon
            points={pointsString}
            fill={getFillColor(isBee, isRevealed, isFlagged)}
            {...polygonStyles}
        />
        {isRevealed && (
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
    </>
));

HiveCellHex.propTypes = {
    gameSize: PropTypes.number,
    cellSize: PropTypes.number,
    pointsString: PropTypes.string,
    isBee: PropTypes.bool,
    isFlagged: PropTypes.bool,
    isRevealed: PropTypes.bool,
    neighboringBees: PropTypes.number,
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

export default HiveCellHex;
