import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { LOGO } from '../assets/Images';

const Logo = () => (
    <Image
        style={styles.logo}
        source={LOGO}
    />
);

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: '80%',
        resizeMode: 'stretch',
    },
});

export default Logo;
