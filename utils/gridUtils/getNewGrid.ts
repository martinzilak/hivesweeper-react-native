import * as R from 'ramda';
import { ExtraBeeProbability } from '../../constants/ExtraBeeProbability';
import { GridFactory } from '../../constants/GridFactory';
import { TotalBeeCount } from '../../constants/TotalBeeCount';
import { getNewCell } from '../cellUtils/getNewCell';
import { getHexSize } from '../getHexSize';
import { getPrimitiveHexId } from '../getPrimitiveHexId';
import { randomSubset } from '../randomSubset';
import { getNeighborsOfCellWithId } from './getNeighborsOfCellWithId';
import type { GameSizeValue, HiveCell, HiveGrid, PrimitiveHex } from '../../types/game';

export const getNewGrid = (gameSize: GameSizeValue): HiveGrid => {
  const primitiveGrid = GridFactory[gameSize]();
  const cellSize = getHexSize(gameSize);
  let beeCount = 0;

  const primitiveGridArray: PrimitiveHex[] = Array.from(
    { length: primitiveGrid.length },
    (_, i) => primitiveGrid[i],
  );
  const shuffled = randomSubset(primitiveGrid.length)(primitiveGridArray) as PrimitiveHex[];

  const intermediateGrid: HiveCell[] = R.map((primitiveHex: PrimitiveHex) => {
    const isBee =
      beeCount < TotalBeeCount[gameSize].upperBound &&
      (beeCount < TotalBeeCount[gameSize].lowerBound ||
        Math.random() <= ExtraBeeProbability[gameSize]);
    beeCount += isBee ? 1 : 0;
    return getNewCell(primitiveHex, isBee, cellSize);
  })(shuffled);

  R.forEach((cell: HiveCell) => {
    cell.neighborIds = R.o(
      R.map(getPrimitiveHexId),
      R.reject(R.isNil),
    )(primitiveGrid.neighborsOf(cell.primitiveHex)) as string[];
  })(intermediateGrid);

  const grid: HiveGrid = R.reduce((accumulatedGrid: HiveGrid, cell: HiveCell) => ({
    ...accumulatedGrid,
    [cell.id]: cell,
  }), {})(intermediateGrid);

  R.forEach((cell: HiveCell) => {
    if (!cell.isBee) return;
    R.forEach((neighbor: HiveCell) => {
      neighbor.neighboringBees += 1;
    })(getNeighborsOfCellWithId(grid, cell.id));
  })(R.values(grid));

  return grid;
};
