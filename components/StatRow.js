import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const StatRow = React.memo(({ label, value }) => (
    <View style={styles.statWrapper}>
        <Text style={styles.labelText}>
            {label}
        </Text>

        <Text style={styles.valueText}>
            {value}
        </Text>
    </View>
));

StatRow.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
};

const commonTextStyles = {
    color: 'brown',
    fontSize: 19,
    fontWeight: '500',
};

const styles = StyleSheet.create({
    statWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelText: {
        ...commonTextStyles,
        textAlign: 'left',
    },
    valueText: {
        ...commonTextStyles,
        textAlign: 'right',
    },
});

export default StatRow;
