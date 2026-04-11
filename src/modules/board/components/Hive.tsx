import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G } from 'react-native-svg';
import { BorderedBoxWithBackgroundStyle , HiveDimension ,type  GameSizeValue,type  HiveCell as HiveCellType,type  HiveGrid } from 'hivesweeper/shared';
import { getHiveVerticalOffset } from '../utils/getHiveVerticalOffset';
import HiveCell from './HiveCell';

type Props = {
  hiveGrid: HiveGrid;
  gameSize: GameSizeValue;
  revealCell: (cell: HiveCellType) => void;
  flagCell: (cell: HiveCellType) => void;
};

const Hive = ({ hiveGrid, gameSize, revealCell, flagCell }: Props) => (
  <View style={styles.view}>
    <Svg width={HiveDimension.WIDTH} height={HiveDimension.HEIGHT}>
      <G y={getHiveVerticalOffset(gameSize)}>
        {Object.values(hiveGrid).map((cell) => (
          <HiveCell
            key={cell.id}
            gameSize={gameSize}
            cell={cell}
            revealCell={revealCell}
            flagCell={flagCell}
          />
        ))}
      </G>
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  view: {
    paddingLeft: 10,
    paddingRight: 10,
    ...BorderedBoxWithBackgroundStyle,
  },
});

export default Hive;
