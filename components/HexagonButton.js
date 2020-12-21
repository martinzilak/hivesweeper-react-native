import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import * as R from 'ramda';
import { HIVE_DIMENSION } from '../constants/constants';
import { getFlatHexagonPoints } from '../utils/getFlatHexagonPoints';

const HexagonButton = ({ width = HIVE_DIMENSION.WIDTH, height = 60, onPress, onLongPress }) => {
    const pointsString = R.o(
        R.join(' '),
        R.map(({ x, y }) => `${x},${y}`),
    )(getFlatHexagonPoints(width, height));

    return (
        <View style={styles.view}>
            <TouchableOpacity
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <Svg
                    width={width}
                    height={height}
                >
                    <Polygon
                        x={0}
                        y={0}
                        points={pointsString}
                        fill={polygonStyles.fill}
                        stroke={polygonStyles.stroke}
                        strokeWidth={polygonStyles.strokeWidth}
                    />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

const polygonStyles = {
    fill: 'yellow',
    stroke: 'orange',
    strokeWidth: 3,
};

const styles = StyleSheet.create({
    view: {},
});

export default HexagonButton;
