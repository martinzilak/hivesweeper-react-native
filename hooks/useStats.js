import { useCallback, useEffect, useState } from 'react';
import { DefaultStats } from '../constants/DefaultStats';
import { BestScoreStatByGameSize, Stat, TotalScoreStatByGameSize } from '../constants/Stat';
import { getStatsItem, setStatsItem } from '../utils/AsyncStorage';

export const useStats = () => {
    const [stats, setStats] = useState(DefaultStats);

    const readStats = useCallback(async () => {
        const loadedStats = await getStatsItem();
        if (loadedStats) {
            setStats(loadedStats);
        }
    }, []);

    const getStat = useCallback((statObject) => stats[statObject.key] ?? 0, [stats]);

    const writeStats = useCallback(async (update) => {
        const newStats = {
            ...stats,
            ...update,
        }
        await setStatsItem(newStats);
        setStats(newStats);
    }, [stats]);

    const buildGameStatPartialUpdate = useCallback((statObject, value) => ({
        [statObject.key]: value,
    }), []);

    const buildIncreasedGameStatPartialUpdate = useCallback((statObject, value) => (
        buildGameStatPartialUpdate(statObject, getStat(statObject) + value)
    ), [buildGameStatPartialUpdate, getStat]);

    const buildGameCountPartialUpdate = useCallback((didWin) => ({
        ...buildIncreasedGameStatPartialUpdate(
            didWin ? Stat.GAMES_WON : Stat.GAMES_LOST,
            1
        ),
        ...buildIncreasedGameStatPartialUpdate(Stat.TOTAL_GAMES, 1),
    }), [buildIncreasedGameStatPartialUpdate]);

    const isNewBestScore = useCallback((gameSize, score) => (
        getStat(BestScoreStatByGameSize[gameSize]) < score
    ), [getStat]);

    const buildBestScorePartialUpdate = useCallback((gameSize, score) => ({
        ...(isNewBestScore(gameSize, score) ?
            buildGameStatPartialUpdate(BestScoreStatByGameSize[gameSize], score) :
            {}
        ),
    }), [isNewBestScore, buildGameStatPartialUpdate]);

    const buildGameScorePartialUpdate = useCallback((gameSize, score) => ({
        ...buildIncreasedGameStatPartialUpdate(TotalScoreStatByGameSize[gameSize], score),
        ...buildBestScorePartialUpdate(gameSize, score),
    }), [buildIncreasedGameStatPartialUpdate, buildBestScorePartialUpdate]);

    const updateStats = useCallback(async (gameSize, didWin, score) => {
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

    return { stats, updateStats };
};
