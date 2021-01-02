import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Hive from '../components/Hive';
import HexagonButton from '../components/HexagonButton';
import { useGameStateControl } from '../hooks/useGameStateControl';
import GameSettingsContext from '../contexts/GameSettingsContext';
import { SCREEN } from '../constants/Constants';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

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
            <View style={styles.scoreWrapper}>
                <Text style={styles.scoreText}>
                    {`SCORE ${score}`}
                </Text>

                <Text style={styles.scoreText}>
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
                    text={'RESET'}
                />

                <HexagonButton
                    onPress={() => navigation.navigate(SCREEN.MAIN_MENU)}
                    text={'MAIN MENU'}
                />
            </View>
        </BackgroundScreenWrapper>
    );
};

GameScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    scoreWrapper: {
        flex: 1,
        width: '95%',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    scoreText: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'brown',
        fontSize: 28,
        fontWeight: '600',
    },
    hiveWrapper: {
        flex: 4,
        justifyContent: 'flex-start',
    },
    buttonsWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default GameScreen;
