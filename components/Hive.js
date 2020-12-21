import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg from 'react-native-svg';
import * as R from 'ramda';
import HiveCell from './HiveCell';
import { HIVE_DIMENSION } from '../constants/constants';

const Hive = ({ grid, revealCell, flagCell }) => (
    <View style={styles.view}>
        <Svg
            width={HIVE_DIMENSION.WIDTH}
            height={HIVE_DIMENSION.HEIGHT}
        >
            {R.map((hex) => (
                <HiveCell
                    key={hex.id}
                    hex={hex}
                    revealCell={revealCell}
                    flagCell={flagCell}
                />
            ))(grid)}
        </Svg>
    </View>
);

const styles = StyleSheet.create({
    view: {
        borderWidth: 1,
        borderColor: 'red',
    },
});

export default Hive;
