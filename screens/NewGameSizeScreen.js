import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import HexagonButton from '../components/HexagonButton';
import Logo from '../components/Logo';
import { useGameSettings } from '../hooks/useGameSettings';
import { HIVE_SIZE, SCREEN } from '../constants/Constants';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const NewGameSizeScreen = ({ navigation }) => {
    const { setGameSize } = useGameSettings();

    const startGameWithSize = useCallback((gameSize) => {
        setGameSize(gameSize);
        navigation.navigate(SCREEN.GAME);
    }, [setGameSize, navigation]);

    return (
        <BackgroundScreenWrapper>
            <View style={styles.logoWrapper}>
                <Logo />
            </View>

            <View style={styles.sizesWrapper}>
                <HexagonButton
                    styles={styles.sizeButton}
                    text="SMALL"
                    onPress={() => startGameWithSize(HIVE_SIZE.SMALL)}
                />

                <HexagonButton
                    styles={styles.sizeButton}
                    text="MEDIUM"
                    onPress={() => startGameWithSize(HIVE_SIZE.MEDIUM)}
                />

                <HexagonButton
                    styles={styles.sizeButton}
                    text="LARGE"
                    onPress={() => startGameWithSize(HIVE_SIZE.LARGE)}
                />
            </View>

            <View style={styles.backWrapper}>
                <HexagonButton
                    text="BACK"
                    onPress={() => navigation.navigate(SCREEN.MAIN_MENU)}
                />
            </View>
        </BackgroundScreenWrapper>
    );
};

NewGameSizeScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    logoWrapper: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
    },
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
    },
});

export default NewGameSizeScreen;
