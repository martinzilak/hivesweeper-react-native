import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Hive from '../components/Hive';
import GameDialog, { type DialogConfig } from '../components/GameDialog';
import {
  HexagonButton,
  BorderedBoxWithBackgroundStyle,
  Screen,
  HiveDimension,
  SafeAreaScreenWrapper,
  useIsPointerDevice,
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

  const [dialog, setDialog] = useState<DialogConfig | null>(null);
  const [flagMode, setFlagMode] = useState(false);
  const isPointerDevice = useIsPointerDevice();

  const resetGame = useCallback(
    () => storeResetGame(gameSize),
    [storeResetGame, gameSize],
  );

  const handleDialogButtonPress = useCallback(() => {
    setDialog(null);
    setFlagMode(false);
    resetGame();
  }, [resetGame]);

  useGameEffects({
    onWin: (isNewBest) =>
      setDialog({
        title: 'You won!',
        subtitle: isNewBest ? 'New best score, congratulations!' : undefined,
        buttonText: 'PLAY AGAIN',
      }),
    onLost: () =>
      setDialog({
        title: 'You lost!',
        subtitle: 'Hint: Use the flag button to mark cells you suspect hide a hornet.',
        buttonText: 'TRY AGAIN',
      }),
  });

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
        {hiveGrid && <Hive hiveGrid={hiveGrid} gameSize={gameSize} flagMode={flagMode} />}
      </View>

      <View style={styles.buttonsWrapper}>
        {isPointerDevice ? (
          <>
            <HexagonButton
              onPress={() => setFlagMode((prev) => !prev)}
              width={Math.ceil(0.3 * HiveDimension.WIDTH)}
              text="FLAG"
              polygonFill={flagMode ? 'orange' : 'gold'}
              polygonStroke={flagMode ? 'brown' : 'orange'}
            />
            <View style={styles.buttonGroup}>
              <HexagonButton
                onPress={resetGame}
                width={Math.ceil(0.3 * HiveDimension.WIDTH)}
                text="RESET"
              />
              <HexagonButton
                onPress={() => navigation.navigate(Screen.MAIN_MENU)}
                width={Math.ceil(0.3 * HiveDimension.WIDTH)}
                text="MENU"
              />
            </View>
          </>
        ) : (
          <>
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
          </>
        )}
      </View>

      {dialog && (
        <GameDialog
          title={dialog.title}
          subtitle={dialog.subtitle}
          buttonText={dialog.buttonText}
          onButtonPress={handleDialogButtonPress}
        />
      )}
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
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default GameScreen;
