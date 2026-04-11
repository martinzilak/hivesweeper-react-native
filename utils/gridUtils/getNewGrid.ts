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
  const shuffled = randomSubset(primitiveGrid.length)(primitiveGridArray);

  const intermediateGrid: HiveCell[] = shuffled.map((primitiveHex) => {
    const isBee =
      beeCount < TotalBeeCount[gameSize].upperBound &&
      (beeCount < TotalBeeCount[gameSize].lowerBound ||
        Math.random() <= ExtraBeeProbability[gameSize]);
    beeCount += isBee ? 1 : 0;
    return getNewCell(primitiveHex, isBee, cellSize);
  });

  intermediateGrid.forEach((cell) => {
    cell.neighborIds = primitiveGrid
      .neighborsOf(cell.primitiveHex)
      .filter((n): n is PrimitiveHex => n != null)
      .map(getPrimitiveHexId);
  });

  const grid: HiveGrid = intermediateGrid.reduce<HiveGrid>(
    (acc, cell) => ({ ...acc, [cell.id]: cell }),
    {},
  );

  Object.values(grid).forEach((cell) => {
    if (!cell.isBee) return;
    getNeighborsOfCellWithId(grid, cell.id).forEach((neighbor) => {
      neighbor.neighboringBees += 1;
    });
  });

  return grid;
};
