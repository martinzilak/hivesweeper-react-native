import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import HexagonButton from '../components/HexagonButton';
import Logo from '../components/Logo';
import { GameSize } from '../constants/GameSize';
import { Screen } from '../constants/Screen';
import { useGameSettings } from '../hooks/useGameSettings';
import SafeAreaScreenWrapper from './SafeAreaScreenWrapper';

const NewGameSizeScreen = React.memo(({ navigation }) => {
    const { setGameSize } = useGameSettings();

    const startGameWithSize = useCallback((gameSize) => {
        setGameSize(gameSize);
        navigation.navigate(Screen.GAME);
    }, [setGameSize, navigation]);

    return (
        <SafeAreaScreenWrapper>
            <Logo />

            <View style={styles.sizesWrapper}>
                <HexagonButton
                    styles={styles.sizeButton}
                    text="EASY"
                    onPress={() => startGameWithSize(GameSize.SMALL)}
                />

                <HexagonButton
                    styles={styles.sizeButton}
                    text="NORMAL"
                    onPress={() => startGameWithSize(GameSize.MEDIUM)}
                />

                <HexagonButton
                    styles={styles.sizeButton}
                    text="HARD"
                    onPress={() => startGameWithSize(GameSize.LARGE)}
                />
            </View>

            <View style={styles.backWrapper}>
                <HexagonButton
                    text="BACK"
                    onPress={() => navigation.navigate(Screen.MAIN_MENU)}
                />
            </View>
        </SafeAreaScreenWrapper>
    );
});

NewGameSizeScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    sizesWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    sizeButton: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    backWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        bottom: 10,
    },
});

export default NewGameSizeScreen;
