import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import HexagonButton from '../components/HexagonButton';
import { useGameSettings } from '../hooks/useGameSettings';
import Logo from '../components/Logo';
import { Screen } from '../constants/Screen';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const MainMenuScreen = ({ navigation }) => {
    const { isSoundEnabled, setIsSoundEnabled, isMusicEnabled, setIsMusicEnabled } = useGameSettings();

    return (
        <BackgroundScreenWrapper>
            <View style={styles.logoWrapper}>
                <Logo />
            </View>

            <View style={styles.optionsWrapper}>
                <HexagonButton
                    styles={styles.optionButton}
                    text="NEW GAME"
                    onPress={() => navigation.navigate(Screen.NEW_GAME_SIZE)}
                />

                <HexagonButton
                    styles={styles.optionButton}
                    text="MUSIC"
                    onPress={() => setIsMusicEnabled(!isMusicEnabled)}
                    {...getExtraOptionButtonStyles(isMusicEnabled)}
                />

                <HexagonButton
                    styles={styles.optionButton}
                    text="SOUND"
                    onPress={() => setIsSoundEnabled(!isSoundEnabled)}
                    {...getExtraOptionButtonStyles(isSoundEnabled)}
                />
            </View>
        </BackgroundScreenWrapper>
    );
};

MainMenuScreen.propTypes = {
    navigation: PropTypes.object,
};

const getExtraOptionButtonStyles = (isEnabled) => {
    if (!isEnabled) {
        return {
            polygonFill: 'silver',
            polygonStroke: 'grey',
            textFill: 'dimgrey',
        };
    }
    return {};
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
    optionsWrapper: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    optionButton: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default MainMenuScreen;
