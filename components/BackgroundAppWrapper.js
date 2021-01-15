import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { BACKGROUND } from '../assets/Images';
import { usePlayMusicLoop } from '../hooks/usePlayMusicLoop';

const BackgroundAppWrapper = React.memo(({ children }) => {
    usePlayMusicLoop();

    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={BACKGROUND}
        >
            {children}
        </ImageBackground>
    );
});

BackgroundAppWrapper.propTypes = {
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

export default BackgroundAppWrapper;
