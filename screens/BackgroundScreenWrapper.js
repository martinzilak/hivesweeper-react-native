import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { BACKGROUND } from '../assets/Images';
import { useMusicLoopHandler } from '../hooks/useMusicLoopHandler';

const BackgroundScreenWrapper = ({ children }) => {
    useMusicLoopHandler();

    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={BACKGROUND}
        >
            <SafeAreaView style={styles.appWrapper}>
                {children}
            </SafeAreaView>
        </ImageBackground>
    );
};

BackgroundScreenWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

const styles = StyleSheet.create({
    appWrapper: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default BackgroundScreenWrapper;
