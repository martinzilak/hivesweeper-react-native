import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  HexagonButton,
  Logo,
  GameSize,
  Screen,
  SafeAreaScreenWrapper,
  type GameSizeValue,
  type RootStackParamList,
} from 'hivesweeper/shared';
import { useSettingsStore } from 'hivesweeper/settings';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const NewGameSizeScreen = React.memo(({ navigation }: Props) => {
  const setGameSize = useSettingsStore((s) => s.setGameSize);

  const startGameWithSize = useCallback(
    (gameSize: GameSizeValue) => {
      setGameSize(gameSize);
      navigation.navigate(Screen.GAME);
    },
    [setGameSize, navigation],
  );

  return (
    <SafeAreaScreenWrapper>
      <Logo />

      <View style={styles.sizesWrapper}>
        <HexagonButton
          styles={styles.sizeButton}
          text="EASY"
          onPress={() => startGameWithSize(GameSize.SMALL)}
        />
        <HexagonButton
          styles={styles.sizeButton}
          text="NORMAL"
          onPress={() => startGameWithSize(GameSize.MEDIUM)}
        />
        <HexagonButton
          styles={styles.sizeButton}
          text="HARD"
          onPress={() => startGameWithSize(GameSize.LARGE)}
        />
      </View>

      <View style={styles.backWrapper}>
        <HexagonButton
          text="BACK"
          onPress={() => navigation.navigate(Screen.MAIN_MENU)}
        />
      </View>
    </SafeAreaScreenWrapper>
  );
});

const styles = StyleSheet.create({
  sizesWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sizeButton: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  backWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 10,
  },
});

export default NewGameSizeScreen;
