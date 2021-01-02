import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Svg, { G } from 'react-native-svg';
import * as R from 'ramda';
import { HIVE_DIMENSION, HIVE_Y_OFFSET } from '../constants/Constants';
import HiveCell from './HiveCell';

const Hive = ({ grid, gameSize, revealCell, flagCell }) => (
    <View style={styles.view}>
        <Svg
            width={HIVE_DIMENSION.WIDTH}
            height={HIVE_DIMENSION.HEIGHT}
        >
            <G
                y={HIVE_Y_OFFSET[gameSize]}
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
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});

export default Hive;
