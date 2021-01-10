import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { LOGO } from '../assets/Images';

const Logo = ({ flex = 1}) => (
    <View style={getLogoWrapperStyles(flex)}>
        <Image
            style={styles.logo}
            source={LOGO}
        />
    </View>
);

Logo.propTypes = {
    flex: PropTypes.number,
};

const getLogoWrapperStyles = (flex) => ({
    width: '100%',
    flex,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 40,
});

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
});

export default Logo;
