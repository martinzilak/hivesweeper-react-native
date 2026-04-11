import { useEffect } from 'react';
import { Alert } from 'react-native';
import { LOSE, WIN, usePlaySound, useVibrate } from 'hivesweeper/shared';
import { useSettingsStore } from 'hivesweeper/settings';
import { useGameStore, gameEmitter } from 'hivesweeper/game';

export const useGameEffects = () => {
  const { playSound } = usePlaySound();
  const { vibrate } = useVibrate();
  const resetGame = useGameStore((s) => s.resetGame);
  const gameSize = useSettingsStore((s) => s.gameSize);

  useEffect(() => {
    const handleLost = () => {
      playSound(LOSE);
      vibrate();
      Alert.alert(
        'You lost!',
        'Hint: Use the flag button to mark cells you suspect hide a hornet.',
        [{ text: 'Try again', onPress: () => resetGame(gameSize) }],
      );
    };

    const handleStatsResolved = ({
      isNewBest,
      status,
    }: {
      isNewBest: boolean;
      status: 'won' | 'lost';
    }) => {
      if (status === 'won') {
        playSound(WIN);
        vibrate();
        Alert.alert(
          'You won!',
          isNewBest ? 'New best score, congratulations!' : undefined,
          [{ text: 'Play again', onPress: () => resetGame(gameSize) }],
        );
      }
    };

    gameEmitter.on('lost', handleLost);
    gameEmitter.on('statsResolved', handleStatsResolved);
    return () => {
      gameEmitter.off('lost', handleLost);
      gameEmitter.off('statsResolved', handleStatsResolved);
    };
  }, [playSound, vibrate, resetGame, gameSize]);
};
