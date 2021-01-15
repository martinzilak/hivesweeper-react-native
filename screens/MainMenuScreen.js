import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import HexagonButton from '../components/HexagonButton';
import Logo from '../components/Logo';
import { Screen } from '../constants/Screen';
import SafeAreaScreenWrapper from './SafeAreaScreenWrapper';

const MainMenuScreen = React.memo(({ navigation }) => (
    <SafeAreaScreenWrapper>
        <Logo />

        <View style={styles.optionsWrapper}>
            <HexagonButton
                styles={styles.optionButton}
                text="NEW GAME"
                onPress={() => navigation.navigate(Screen.NEW_GAME_SIZE)}
            />

            <HexagonButton
                styles={styles.optionButton}
                text="SETTINGS"
                onPress={() => navigation.navigate(Screen.SETTINGS)}
            />

            <HexagonButton
                styles={styles.optionButton}
                text="STATS"
                onPress={() => navigation.navigate(Screen.STATS)}
            />
        </View>
    </SafeAreaScreenWrapper>
));

MainMenuScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
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
