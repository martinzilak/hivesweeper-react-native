import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import HexagonButton from '../components/HexagonButton';
import Logo from '../components/Logo';
import { Screen } from '../constants/Screen';
import { useGameSettings } from '../hooks/useGameSettings';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const SettingsScreen = ({ navigation }) => {
    const {
        isSoundEnabled,
        setIsSoundEnabled,
        isMusicEnabled,
        setIsMusicEnabled,
        isVibrationEnabled,
        setIsVibrationEnabled,
    } = useGameSettings();

    return (
        <BackgroundScreenWrapper>
            <View style={styles.logoWrapper}>
                <Logo />
            </View>

            <View style={styles.settingsWrapper}>
                <HexagonButton
                    styles={styles.settingButton}
                    text="MUSIC"
                    onPress={() => setIsMusicEnabled(!isMusicEnabled)}
                    {...getExtraOptionButtonStyles(isMusicEnabled)}
                />

                <HexagonButton
                    styles={styles.settingButton}
                    text="SOUND"
                    onPress={() => setIsSoundEnabled(!isSoundEnabled)}
                    {...getExtraOptionButtonStyles(isSoundEnabled)}
                />

                <HexagonButton
                    styles={styles.settingButton}
                    text="VIBRATION"
                    onPress={() => setIsVibrationEnabled(!isVibrationEnabled)}
                    {...getExtraOptionButtonStyles(isVibrationEnabled)}
                />
            </View>

            <View style={styles.backWrapper}>
                <HexagonButton
                    text="BACK"
                    onPress={() => navigation.navigate(Screen.MAIN_MENU)}
                />
            </View>
        </BackgroundScreenWrapper>
    );
};

SettingsScreen.propTypes = {
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
    settingsWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    settingButton: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    backWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default SettingsScreen;
