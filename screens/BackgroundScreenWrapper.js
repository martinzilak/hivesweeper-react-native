import React, {useEffect} from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { BACKGROUND } from '../assets/Images';
import { MUSIC_LOOP } from '../assets/Sounds';
import { useGameSettings } from '../hooks/useGameSettings';

const BackgroundScreenWrapper = ({ children }) => {
    const { isMusicEnabled } = useGameSettings();

    useEffect(() => {
        if (isMusicEnabled) {
            if (!MUSIC_LOOP.isPlaying()) {
                MUSIC_LOOP.play();
            }
        } else {
            if (MUSIC_LOOP.isPlaying()) {
                MUSIC_LOOP.pause();
            }
        }
    }, [isMusicEnabled]);

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
