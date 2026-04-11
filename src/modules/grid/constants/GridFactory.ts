import { defineGrid, extendHex } from 'honeycomb-grid';
import { getHexSize } from '../geometry/getHexSize';
import { GameSize ,type  GameSizeValue } from 'hivesweeper/shared';

const getGridFactory = (gameSize: GameSizeValue) => {
  const HexFactory = extendHex({
    size: getHexSize(gameSize),
    orientation: 'flat',
  });

  const GridFactory = defineGrid(HexFactory);

  return () => GridFactory.hexagon({
    radius: gameSize / 2,
    center: [gameSize / 2, gameSize / 2],
  });
};

export const GridFactory: Record<GameSizeValue, () => ReturnType<ReturnType<typeof defineGrid>['hexagon']>> = {
  [GameSize.SMALL]: getGridFactory(GameSize.SMALL),
  [GameSize.MEDIUM]: getGridFactory(GameSize.MEDIUM),
  [GameSize.LARGE]: getGridFactory(GameSize.LARGE),
};
