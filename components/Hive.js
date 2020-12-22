import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import * as R from 'ramda';
import { HIVE_DIMENSION } from '../constants/constants';
import HiveCell from './HiveCell';

const Hive = ({ grid, gameSize, revealCell, flagCell }) => (
    <View style={styles.view}>
        <Svg
            width={HIVE_DIMENSION.WIDTH}
            height={HIVE_DIMENSION.HEIGHT}
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
        borderWidth: 1,
        borderColor: 'red',
    },
});

export default Hive;
