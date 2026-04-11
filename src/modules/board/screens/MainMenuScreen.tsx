import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  HexagonButton,
  Logo,
  Screen,
  SafeAreaScreenWrapper,
  type RootStackParamList,
} from 'hivesweeper/shared';
import { useGameStore } from 'hivesweeper/game';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const MainMenuScreen = React.memo(({ navigation }: Props) => {
  const canResume = useGameStore(
    (s) => s.gameStatus === 'playing' && s.hasFirstCellBeenRevealed,
  );

  return (
    <SafeAreaScreenWrapper>
      <Logo />

      <View style={styles.optionsWrapper}>
        {canResume && (
          <HexagonButton
            styles={styles.optionButton}
            text="RESUME"
            onPress={() => navigation.navigate(Screen.GAME, { resume: true })}
          />
        )}
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
  );
});

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
