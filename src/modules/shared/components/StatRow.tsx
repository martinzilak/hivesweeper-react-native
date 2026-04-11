import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  value: number;
};

const StatRow = React.memo(({ label, value }: Props) => (
  <View style={styles.statWrapper}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </View>
));

const commonTextStyles = {
  color: 'brown',
  fontSize: 19,
  fontWeight: '500' as const,
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
