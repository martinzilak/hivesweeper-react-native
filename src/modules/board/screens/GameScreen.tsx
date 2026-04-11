import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Hive from '../components/Hive';
import {
  HexagonButton,
  BorderedBoxWithBackgroundStyle,
  Screen,
  HiveDimension,
  SafeAreaScreenWrapper,
  type RootStackParamList,
} from 'hivesweeper/shared';
import { useSettingsStore } from 'hivesweeper/settings';
import { useGameStore } from 'hivesweeper/game';
import { useGameEffects } from '../hooks/useGameEffects';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'GameScreen'>;
};

const GameScreen = ({ navigation, route }: Props) => {
  const gameSize = useSettingsStore((s) => s.gameSize);

  const hiveGrid = useGameStore((s) => s.grid);
  const flagsRemaining = useGameStore((s) => s.flagsRemaining);
  const score = useGameStore((s) => s.score);
  const storeResetGame = useGameStore((s) => s.resetGame);

  useGameEffects();

  const resetGame = useCallback(
    () => storeResetGame(gameSize),
    [storeResetGame, gameSize],
  );

  useEffect(() => {
    if (!route.params?.resume) storeResetGame(gameSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaScreenWrapper>
      <View style={styles.statsWrapper}>
        <Text style={styles.statsText}>{`SCORE ${score}`}</Text>
        <Text style={styles.statsText}>{`FLAGS ${flagsRemaining}`}</Text>
      </View>

      <View style={styles.hiveWrapper}>
        {hiveGrid && <Hive hiveGrid={hiveGrid} gameSize={gameSize} />}
      </View>

      <View style={styles.buttonsWrapper}>
        <HexagonButton
          onPress={resetGame}
          width={Math.ceil(0.45 * HiveDimension.WIDTH)}
          text="RESET"
        />
        <HexagonButton
          onPress={() => navigation.navigate(Screen.MAIN_MENU)}
          width={Math.ceil(0.45 * HiveDimension.WIDTH)}
          text="MENU"
        />
      </View>
    </SafeAreaScreenWrapper>
  );
};

const styles = StyleSheet.create({
  statsWrapper: {
    flex: 1,
    width: '95%',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statsText: {
    ...BorderedBoxWithBackgroundStyle,
    color: 'brown',
    fontSize: 28,
    fontWeight: '500',
  },
  hiveWrapper: {
    flex: 10,
    justifyContent: 'center',
  },
  buttonsWrapper: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
});

export default GameScreen;
