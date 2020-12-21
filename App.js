import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import * as R from 'ramda';
import Hive from './components/Hive';
import { HIVE_SIZE } from './constants/constants';
import { useHexGridFactory } from './hooks/useHexGridFactory';
import HexagonButton from "./components/HexagonButton";

const revealCell = R.curry((setGrid, generateGrid, hex) => {
  const { index, isBee, isRevealed, isFlagged, neighbors } = hex;

  if (isBee) {
    Alert.alert('YOU LOSE', null, 'Ok');
    setGrid(generateGrid());
    return;
  }

  if (isRevealed) {
    return;
  }

  if (isFlagged) {
    hex.setIsFlagged(false);
    setGrid(R.update(index, hex));
    return;
  }

  hex.setIsRevealed(true);
  setGrid(R.update(index, hex));

  neighbors.forEach((neighbor) => {
    const {
      index: neighborIndex,
      isRevealed: neighborRevealed,
      isBee: neighborBee,
      isFlagged: neighborFlagged,
      neighboringBees: neighborNeighboringBees,
    } = neighbor;
    if (!neighborRevealed && !neighborBee && ! neighborFlagged && neighborNeighboringBees === 0) {
      neighbor.setIsRevealed(true);
      setGrid(R.update(neighborIndex, neighbor));
    }
  });
});

const flagCell = R.curry((setGrid, hex) => {
  const { index, isRevealed, isFlagged } = hex;

  if (isRevealed) {
    return;
  }

  hex.setIsFlagged(!isFlagged);
  setGrid(R.update(index, hex));
});

const App = () => {
  const { generateGrid } = useHexGridFactory(HIVE_SIZE.SMALL);
  const [grid, setGrid] = useState(generateGrid());

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <Hive
            grid={grid}
            revealCell={revealCell(setGrid, generateGrid)}
            flagCell={flagCell(setGrid)}
        />

        <HexagonButton
            onPress={() => Alert.alert('test', null, 'Ok')}
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
});

export default App;
