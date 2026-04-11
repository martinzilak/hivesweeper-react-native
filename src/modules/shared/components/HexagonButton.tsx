import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import Svg, { Polygon, Text } from 'react-native-svg';
import { usePlaySound } from '../hooks/usePlaySound';
import { useVibrate } from '../hooks/useVibrate';
import { getFlatHexagonPoints } from '../utils/getFlatHexagonPoints';
import { getPointsStringFromCorners } from '../utils/getPointsStringFromCorners';
import { PRESS, LONG_PRESS } from '../assets/Sounds';
import { HiveDimension } from '../constants/HiveDimension';
type Props = {
  styles?: ViewStyle;
  width?: number;
  height?: number;
  text?: string;
  onPress: () => void;
  onPressSound?: number;
  onLongPress?: () => void;
  onLongPressSound?: number;
  polygonFill?: string;
  polygonStroke?: string;
  textFill?: string;
};

const HexagonButton = React.memo(({
  styles: containerStyles,
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
}: Props) => {
  const pointsString = getPointsStringFromCorners(getFlatHexagonPoints(width, height));
  const { playSound } = usePlaySound();
  const { vibrate } = useVibrate();

  return (
    <View style={containerStyles}>
      <TouchableOpacity
        onPress={() => { playSound(onPressSound); vibrate(); onPress(); }}
        onLongPress={() => { playSound(onLongPressSound); vibrate(); onLongPress(); }}
      >
        <Svg width={width} height={height}>
          <Polygon
            x={0}
            y={0}
            points={pointsString}
            fill={polygonFill}
            stroke={polygonStroke}
            strokeWidth={2}
          />
          {text && (
            <Text
              x={width / 2}
              y={0.75 * height}
              textAnchor="middle"
              fill={textFill}
              fontSize={Math.ceil(0.66 * height)}
              fontWeight="500"
            >
              {text}
            </Text>
          )}
        </Svg>
      </TouchableOpacity>
    </View>
  );
});

export default HexagonButton;
