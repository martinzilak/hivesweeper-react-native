import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Hive from './components/Hive';
import { HIVE_SIZE } from './constants/constants';
import HexagonButton from './components/HexagonButton';
import { useGameStateControl } from './hooks/useGameStateControl';

const App = () => {
  const gameSize = HIVE_SIZE.SMALL;

  const {
    grid,
    beesRemaining,
    score,
    resetGame,
    flagCell,
    revealCell,
  } = useGameStateControl(gameSize);

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* component did mount */]);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.scoreView}>
          <Text style={styles.scoreText}>
            {`SCORE ${score}`}
          </Text>

          <Text style={styles.scoreText}>
            {`BEES ${beesRemaining}`}
          </Text>
        </View>
        
        <Hive
            grid={grid}
            gameSize={gameSize}
            revealCell={revealCell}
            flagCell={flagCell}
        />

        <HexagonButton
            onPress={() => resetGame()}
            text={'reset'}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  scoreText: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'brown',
    fontSize: 28,
    fontWeight: '600',
  },
});

export default App;
