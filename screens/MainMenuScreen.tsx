import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HexagonButton from '../components/HexagonButton';
import Logo from '../components/Logo';
import { Screen } from '../constants/Screen';
import SafeAreaScreenWrapper from './SafeAreaScreenWrapper';
import type { RootStackParamList } from '../types/game';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const MainMenuScreen = React.memo(({ navigation }: Props) => (
  <SafeAreaScreenWrapper>
    <Logo />

    <View style={styles.optionsWrapper}>
      <HexagonButton
        styles={styles.optionButton}
        text="NEW GAME"
        onPress={() => navigation.navigate(Screen.NEW_GAME_SIZE)}
      />
      <HexagonButton
        styles={styles.optionButton}
        text="SETTINGS"
        onPress={() => navigation.navigate(Screen.SETTINGS)}
      />
      <HexagonButton
        styles={styles.optionButton}
        text="STATS"
        onPress={() => navigation.navigate(Screen.STATS)}
      />
    </View>
  </SafeAreaScreenWrapper>
));

const styles = StyleSheet.create({
  optionsWrapper: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionButton: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default MainMenuScreen;