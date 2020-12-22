import React from 'react';
import { View, StyleSheet } from 'react-native';
import HexagonButton from '../components/HexagonButton';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const NewGameSizeScreen = () => (
    <BackgroundScreenWrapper>
        <View style={styles.sizesWrapper}>
            <HexagonButton
                styles={styles.sizeButton}
            />

            <HexagonButton
                styles={styles.sizeButton}
            />

            <HexagonButton
                styles={styles.sizeButton}
            />
        </View>

        <View style={styles.backWrapper}>
            <HexagonButton
                styles={styles.backButton}
            />
        </View>
    </BackgroundScreenWrapper>
);

const styles = StyleSheet.create({
    sizesWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sizeButton: {
        marginBottom: 10,
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
