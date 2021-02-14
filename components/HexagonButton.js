import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Polygon, Text } from 'react-native-svg';
import PropTypes from 'prop-types';
import { usePlaySound } from '../hooks/usePlaySound';
import { useVibrate } from '../hooks/useVibrate';
import { getFlatHexagonPoints } from '../utils/getFlatHexagonPoints';
import { getPointsStringFromCorners } from '../utils/getPointsStringFromCorners';
import { PRESS, LONG_PRESS } from '../assets/Sounds';
import { HiveDimension } from '../constants/HiveDimension';

const HexagonButton = React.memo(({
    styles,
    width = HiveDimension.WIDTH,
    height = 60,
    text,
    onPress,
    onPressSound = PRESS,
    onLongPress = () => {},
    onLongPressSound = LONG_PRESS,
    polygonFill = 'gold',
    polygonStroke = 'orange',
    textFill = 'brown',
}) => {
    const pointsString = getPointsStringFromCorners(getFlatHexagonPoints(width, height));
    const { playSound } = usePlaySound();
    const { vibrate } = useVibrate();

    return (
        <View style={styles}>
            <TouchableOpacity
                onPress={() => {
                    playSound(onPressSound);
                    vibrate();
                    onPress();
                }}
                onLongPress={() => {
                    playSound(onLongPressSound);
                    vibrate();
                    onLongPress();
                }}
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
});

HexagonButton.propTypes = {
    styles: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    text: PropTypes.string,
    onPress: PropTypes.func,
    onPressSound: PropTypes.object,
    onLongPress: PropTypes.func,
    onLongPressSound: PropTypes.object,
};

const getPolygonStyles = (polygonFill, polygonStroke) => ({
    fill: polygonFill,
    stroke: polygonStroke,
    strokeWidth: 2,
});

const getTextStyles = (textFill, buttonHeight) => ({
    fill: textFill,
    fontSize: Math.ceil (0.66 * buttonHeight),
    fontWeight: '500',
});

export default HexagonButton;
