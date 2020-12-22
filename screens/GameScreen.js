import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Hive from '../components/Hive';
import HexagonButton from '../components/HexagonButton';
import { useGameStateControl } from '../hooks/useGameStateControl';
import { GameSizeContext } from '../contexts/GameSizeContext';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const GameScreen = () => {
    const gameSize = useContext(GameSizeContext);

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

            <Hive
                grid={grid}
                gameSize={gameSize}
                revealCell={revealCell}
                flagCell={flagCell}
            />

            <HexagonButton
                onPress={() => resetGame()}
                text={'reset'}
            />
        </BackgroundScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scoreWrapper: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
});

export default GameScreen;
