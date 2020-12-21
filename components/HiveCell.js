import React from 'react';
import { Polygon } from 'react-native-svg';

const HiveCell = ({ hex, revealCell, flagCell }) => {
    const { x, y, pointsString, isBee, isFlagged, isRevealed } = hex;

    return (
        <Polygon
            x={x}
            y={y}
            points={pointsString}
            fill={getFillColor(isBee, isRevealed, isFlagged)}
            stroke={styles.stroke}
            strokeWidth={styles.strokeWidth}
            onPress={() => revealCell(hex)}
            onLongPress={() => flagCell(hex)}
        />
    );
};

const styles = {
    fill: 'yellow',
    revealedFill: 'blue',
    beeFill: 'black',
    flaggedFill: 'green',
    stroke: 'orange',
    strokeWidth: 1,
};

const getFillColor = (isBee, isRevealed, isFlagged) => {
    if (isRevealed) {
        return isBee ? styles.beeFill : styles.revealedFill;
    }
    if (isFlagged) {
        return styles.flaggedFill;
    }
    return styles.fill;
};

export default HiveCell;