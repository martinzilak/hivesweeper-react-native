import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G } from 'react-native-svg';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { BorderedBoxWithBackgroundStyle } from '../constants/BorderedBoxWithBackgroundStyle';
import { HiveDimension } from '../constants/HiveDimension';
import { getHiveVerticalOffset } from '../utils/getHiveVerticalOffset';
import HiveCell from './HiveCell';

const Hive = ({ grid, gameSize, revealCell, flagCell }) => (
    <View style={styles.view}>
        <Svg
            width={HiveDimension.WIDTH}
            height={HiveDimension.HEIGHT}
        >
            <G
                y={getHiveVerticalOffset(gameSize)}
            >
                {R.map((hex) => (
                    <HiveCell
                        key={hex.id}
                        gameSize={gameSize}
                        hex={hex}
                        revealCell={revealCell}
                        flagCell={flagCell}
                    />
                ))(grid)}
            </G>
        </Svg>
    </View>
);

Hive.propTypes = {
    grid: PropTypes.arrayOf(PropTypes.object),
    gameSize: PropTypes.number,
    revealCell: PropTypes.func,
    flagCell: PropTypes.func,
};

const styles = StyleSheet.create({
    view: {
        paddingLeft: 10,
        paddingRight: 10,
        ...BorderedBoxWithBackgroundStyle,
    },
});

export default Hive;
