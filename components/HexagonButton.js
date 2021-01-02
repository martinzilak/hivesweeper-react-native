import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Polygon, Text } from 'react-native-svg';
import { HIVE_DIMENSION } from '../constants/Constants';
import { getFlatHexagonPoints } from '../utils/getFlatHexagonPoints';
import { getPointsStringFromCorners } from '../utils/getPointsStringFromCorners';

const HexagonButton = ({
    styles,
    width = HIVE_DIMENSION.WIDTH,
    height = 60,
    text,
    onPress,
    onLongPress,
    polygonFill = 'gold',
    polygonStroke = 'orange',
    textFill = 'brown',
}) => {
    const pointsString = getPointsStringFromCorners(getFlatHexagonPoints(width, height));

    return (
        <View style={styles}>
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
                        {...getPolygonStyles(polygonFill, polygonStroke)}
                    />
                    {text && (
                        <Text
                            x={width / 2}
                            y={0.75 * height}
                            textAnchor="middle"
                            {...getTextStyles(textFill, height)}
                        >
                            {text}
                        </Text>
                    )}
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

HexagonButton.propTypes = {
    styles: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
};

const getPolygonStyles = (polygonFill, polygonStroke) => ({
    fill: polygonFill,
    stroke: polygonStroke,
    strokeWidth: 2,
});

const getTextStyles = (textFill, buttonHeight) => ({
    fill: textFill,
    fontSize: Math.ceil (0.66 * buttonHeight),
    fontWeight: '600',
});

export default HexagonButton;
