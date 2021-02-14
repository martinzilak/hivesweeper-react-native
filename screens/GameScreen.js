import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Hive from '../components/Hive';
import HexagonButton from '../components/HexagonButton';
import { BorderedBoxWithBackgroundStyle } from '../constants/BorderedBoxWithBackgroundStyle';
import { Screen } from '../constants/Screen';
import { HiveDimension } from '../constants/HiveDimension';
import GameSettingsContext from '../contexts/GameSettingsContext';
import { useGameStateControl } from '../hooks/useGameStateControl';
import SafeAreaScreenWrapper from './SafeAreaScreenWrapper';

const GameScreen = React.memo(({ navigation }) => {
    const { gameSize } = useContext(GameSettingsContext);

    const {
        hiveGrid,
        flagsRemaining,
        score,
        resetGame,
        flagCell,
        revealCell,
    } = useGameStateControl(gameSize);

    useEffect(() => {
        resetGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeAreaScreenWrapper>
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
                    hiveGrid={hiveGrid}
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
        </SafeAreaScreenWrapper>
    );
});

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
        ...BorderedBoxWithBackgroundStyle,
        color: 'brown',
        fontSize: 28,
        fontWeight: '500',
    },
    hiveWrapper: {
        flex: 10,
        justifyContent: 'center',
    },
    buttonsWrapper: {
        flex: 1,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 10,
    },
});

export default GameScreen;
