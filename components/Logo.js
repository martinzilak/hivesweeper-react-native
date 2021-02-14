import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LOGO } from '../assets/Images';

const Logo = React.memo(() => (
    <View style={styles.wrapper}>
        <Image
            style={styles.logo}
            source={LOGO}
        />
    </View>
));

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
    },
    logo: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
});

export default Logo;
