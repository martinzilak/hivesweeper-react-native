import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const SafeAreaScreenWrapper = ({ children }) => (
    <SafeAreaView style={styles.appWrapper}>
        {children}
    </SafeAreaView>
);

SafeAreaScreenWrapper.propTypes = {
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
});

export default SafeAreaScreenWrapper;
