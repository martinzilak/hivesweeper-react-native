import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Hive from '../components/Hive';
import HexagonButton from '../components/HexagonButton';
import { useGameStateControl } from '../hooks/useGameStateControl';
import GameSettingsContext from '../contexts/GameSettingsContext';
import { Screen } from '../constants/Screen';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';
import {HiveDimension} from "../constants/HiveDimension";

const GameScreen = ({ navigation }) => {
    const { gameSize } = useContext(GameSettingsContext);

    const {
        grid,
        flagsRemaining,
        score,
        resetGame,
        flagCell,
        revealCell,
    } = useGameStateControl(gameSize);

    useEffect(() => {
        resetGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [/* component did mount */]);

    return (
        <BackgroundScreenWrapper>
            <View style={styles.statsWrapper}>
                <Text style={styles.statsText}>
                    {`SCORE ${score}`}
                </Text>

                <Text style={styles.statsText}>
                    {`FLAGS ${flagsRemaining}`}
                </Text>
            </View>

            <View style={styles.hiveWrapper}>
                <Hive
                    grid={grid}
                    gameSize={gameSize}
                    revealCell={revealCell}
                    flagCell={flagCell}
                />
            </View>

            <View style={styles.buttonsWrapper}>
                <HexagonButton
                    onPress={() => resetGame()}
                    width={Math.ceil(0.45 * HiveDimension.WIDTH)}
                    text={'RESET'}
                />

                <HexagonButton
                    onPress={() => navigation.navigate(Screen.MAIN_MENU)}
                    width={Math.ceil(0.45 * HiveDimension.WIDTH)}
                    text={'MENU'}
                />
            </View>
        </BackgroundScreenWrapper>
    );
};

GameScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    statsWrapper: {
        flex: 1,
        width: '95%',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    statsText: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'brown',
        fontSize: 28,
        fontWeight: '600',
    },
    hiveWrapper: {
        flex: 10,
        justifyContent: 'center',
    },
    buttonsWrapper: {
        flex: 1,
        width: '95%',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
});

export default GameScreen;
