import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import HexagonButton from '../components/HexagonButton';
import { useGameSettings } from '../hooks/useGameSettings';
import { SCREEN } from '../constants/constants';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const MainMenuScreen = ({ navigation }) => {
    const { isSoundEnabled, setIsSoundEnabled } = useGameSettings();

    return (
        <BackgroundScreenWrapper>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>
                    MENU
                </Text>
            </View>

            <View style={styles.optionsWrapper}>
                <HexagonButton
                    styles={styles.optionButton}
                    text="NEW GAME"
                    onPress={() => navigation.navigate(SCREEN.NEW_GAME_SIZE)}
                />

                <HexagonButton
                    styles={styles.optionButton}
                    text="SOUND"
                    onPress={() => setIsSoundEnabled(!isSoundEnabled)}
                    {...getExtraOptionButtonStyles(isSoundEnabled)}
                />
            </View>

            <View style={styles.quitWrapper}>
                <HexagonButton
                    styles={styles.quitButton}
                    text="QUIT"
                    onPress={() => {}}
                />
            </View>
        </BackgroundScreenWrapper>
    );
};

MainMenuScreen.propTypes = {
    navigation: PropTypes.object,
};

const getExtraOptionButtonStyles = (isSoundEnabled) => {
    if (!isSoundEnabled) {
        return {
            polygonFill: 'darkgrey',
            polygonStroke: 'grey',
            textFill: 'ghostwhite',
        };
    }
    return {};
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
    optionsWrapper: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    optionButton: {
        paddingBottom: 10,
    },
    quitWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    quitButton: {
        marginBottom: 10,
    },
});

export default MainMenuScreen;
