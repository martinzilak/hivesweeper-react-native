import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaScreenWrapper = React.memo(({ children }: { children: React.ReactNode }) => (
  <SafeAreaView style={styles.appWrapper}>{children}</SafeAreaView>
));

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
