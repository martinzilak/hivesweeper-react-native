import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Polygon, Text } from 'react-native-svg';
import * as R from 'ramda';
import { HIVE_DIMENSION } from '../constants/constants';
import { getFlatHexagonPoints } from '../utils/getFlatHexagonPoints';
import { getPointsStringFromCorners } from '../utils/getPointsStringFromCorners';

const HexagonButton = ({ width = HIVE_DIMENSION.WIDTH, height = 60, text, onPress, onLongPress }) => {
    const pointsString = getPointsStringFromCorners(getFlatHexagonPoints(width, height));

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
                        {...polygonStyles}
                    />
                    {text && (
                        <Text
                            x={width / 2}
                            y={0.75 * height}
                            textAnchor="middle"
                            {...getTextStyles(height)}
                        >
                            {R.toUpper(text)}
                        </Text>
                    )}
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

HexagonButton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
};

const polygonStyles = {
    fill: 'yellow',
    stroke: 'orange',
    strokeWidth: 3,
};

const getTextStyles = (buttonHeight) => ({
    fill: 'brown',
    fontSize: Math.ceil (0.66 * buttonHeight),
    fontWeight: '600',
});

const styles = StyleSheet.create({
    view: {},
});

export default HexagonButton;
