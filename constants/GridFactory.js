import { defineGrid, extendHex } from 'honeycomb-grid';
import { getHexSize } from '../utils/getHexSize';
import { GameSize } from './GameSize';

const getGridFactory = (gameSize) => {
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

export const GridFactory = {
    [GameSize.SMALL]: getGridFactory(GameSize.SMALL),
    [GameSize.MEDIUM]: getGridFactory(GameSize.MEDIUM),
    [GameSize.LARGE]: getGridFactory(GameSize.LARGE),
};
