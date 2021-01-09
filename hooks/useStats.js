import { useCallback, useEffect, useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { DefaultStats } from '../constants/DefaultStats';
import { BestScoreByGameSize, Stats, TotalScoreByGameSize } from '../constants/Stats';
import { StorageKey } from '../constants/StorageKey';

export const useStats = () => {
    const [stats, setStats] = useState(DefaultStats);
    const { getItem, setItem } = useAsyncStorage(StorageKey.STATS);

    const readStats = useCallback(async () => {
        const statsJson = await getItem();
        if (statsJson) {
            setStats(JSON.parse(statsJson));
        }
    }, [getItem]);

    const getStat = useCallback((statObject) => stats[statObject.key] ?? 0, [stats]);

    const writeStats = useCallback(async (update) => {
        const newStats = {
            ...stats,
            ...update,
        }
        await setItem(JSON.stringify(newStats));
        setStats(newStats);
    }, [stats, setItem]);

    const buildGameStatPartialUpdate = useCallback((statObject, value) => ({
        [statObject.key]: value,
    }), []);

    const buildIncreasedGameStatPartialUpdate = useCallback((statObject, value) => (
        buildGameStatPartialUpdate(statObject, getStat(statObject) + value)
    ), [buildGameStatPartialUpdate, getStat]);

    const buildGameCountPartialUpdate = useCallback((didWin) => ({
        ...buildIncreasedGameStatPartialUpdate(
            didWin ? Stats.GAMES_WON : Stats.GAMES_LOST,
            1
        ),
        ...buildIncreasedGameStatPartialUpdate(Stats.TOTAL_GAMES, 1),
    }), [buildIncreasedGameStatPartialUpdate]);

    const isNewBestScore = useCallback((gameSize, score) => (
        getStat(BestScoreByGameSize[gameSize]) < score
    ), [getStat]);

    const buildBestScorePartialUpdate = useCallback((gameSize, score) => ({
        ...(isNewBestScore(gameSize, score) ?
            buildIncreasedGameStatPartialUpdate(BestScoreByGameSize[gameSize], score) :
            {}
        ),
    }), [isNewBestScore, buildIncreasedGameStatPartialUpdate]);

    const buildGameScorePartialUpdate = useCallback((gameSize, score) => ({
        ...buildIncreasedGameStatPartialUpdate(TotalScoreByGameSize[gameSize], score),
        ...buildBestScorePartialUpdate(gameSize, score),
    }), [buildIncreasedGameStatPartialUpdate, buildBestScorePartialUpdate]);

    const handleGameScore = useCallback(async (gameSize, didWin, score) => {
        const isNewBest = isNewBestScore(gameSize, score);

        await writeStats({
            ...buildGameCountPartialUpdate(didWin),
            ...(didWin ? buildGameScorePartialUpdate(gameSize, score) : {}),
        });

        return isNewBest;
    }, [isNewBestScore, writeStats, buildGameCountPartialUpdate, buildGameScorePartialUpdate]);

    useEffect(() => {
        readStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { stats, handleGameScore };
};
