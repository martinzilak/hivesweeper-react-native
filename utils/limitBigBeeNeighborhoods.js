import * as R from 'ramda';
import { NeighboringBeeCountUpperBound } from '../constants/NeighboringBeeCountUpperBound';
import { unsetIsBee } from './unsetIsBee';

export const limitBigBeeNeighborhoods = (gameSize) => (grid) => {
    const beeCellIdsToRemove = R.compose(
        R.uniq,
        R.flatten,
        R.map((beeNeighborhoodIds) => {
            const countToRemove = Math.floor(R.length(beeNeighborhoodIds) / NeighboringBeeCountUpperBound[gameSize]);

            return R.slice(
                Math.floor(R.length(beeNeighborhoodIds) / 2) - Math.floor(countToRemove / 2),
                countToRemove,
            )(beeNeighborhoodIds);
        }),
        R.filter((beeNeighborhoodIds) => R.length(beeNeighborhoodIds) > NeighboringBeeCountUpperBound[gameSize]),
        R.sortBy(R.identity),
        R.map((cell) => {
            let beeNeighborhoodIds = [cell.id];
            let processedIds = [];
            let unprocessedNeighbors = [...cell.neighbors];

            while (R.length(unprocessedNeighbors) > 0) {
                const neighbor = R.prop(0)(unprocessedNeighbors);
                processedIds = R.append(neighbor.id)(processedIds);
                unprocessedNeighbors = R.drop(1)(unprocessedNeighbors);

                if (!R.includes(neighbor.id)(beeNeighborhoodIds)) {
                    beeNeighborhoodIds = R.append(neighbor.id)(beeNeighborhoodIds);
                }

                unprocessedNeighbors = [
                    ...unprocessedNeighbors,
                    ...R.filter(R.allPass([
                        R.prop('isBee'),
                        (neighborNeighbor) => !R.includes(neighborNeighbor.id)(processedIds),
                    ]))(neighbor.neighbors)
                ];
            }

            return beeNeighborhoodIds;
        }),
        R.filter(R.propEq('neighboringBees', 1)),
        R.filter(R.prop('isBee')),
    )(grid);

    return R.forEach((cell) => {
        if (!R.includes(cell.id)(beeCellIdsToRemove)) {
            return;
        }

        unsetIsBee(cell);
    })(grid);
};
