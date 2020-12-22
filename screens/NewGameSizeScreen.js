import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import HexagonButton from '../components/HexagonButton';
import { useGameSettings } from '../hooks/useGameSettings';
import { HIVE_SIZE, SCREEN } from '../constants/constants';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const NewGameSizeScreen = ({ navigation }) => {
    const { setGameSize } = useGameSettings();

    const startGameWithSize = useCallback((gameSize) => {
        setGameSize(gameSize);
        navigation.navigate(SCREEN.GAME);
    }, [setGameSize, navigation]);

    return (
        <BackgroundScreenWrapper>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>
                    SIZE
                </Text>
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
                    styles={styles.backButton}
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
    titleWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
    },
    titleText: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'brown',
        fontSize: 40,
        fontWeight: '600',
    },
    sizesWrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    sizeButton: {
        paddingBottom: 10,
    },
    backWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backButton: {
        marginBottom: 10,
    },
});

export default NewGameSizeScreen;
