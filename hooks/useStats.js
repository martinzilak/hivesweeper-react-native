import { useEffect, useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { DefaultStats } from '../constants/DefaultStats';
import { BestScoreByGameSize, Stats, TotalScoreByGameSize } from '../constants/Stats';
import { StorageKey } from '../constants/StorageKey';

export const useStats = () => {
    const [stats, setStats] = useState(DefaultStats);
    const { getItem, setItem } = useAsyncStorage(StorageKey.STATS);

    const readStats = async () => {
        const statsJson = await getItem();
        if (statsJson) {
            setStats(JSON.parse(statsJson));
        }
    };

    const getStat = (statObject) => stats[statObject.key] ?? 0;

    const writeStats = async (update) => {
        const newStats = {
            ...stats,
            ...update,
        }
        await setItem(JSON.stringify(newStats));
        setStats(newStats);
    };

    const buildGameStatPartialUpdate = (statObject, value) => ({
        [statObject.key]: value,
    });

    const buildIncreasedGameStatPartialUpdate = (statObject, value) => (
        buildGameStatPartialUpdate(statObject, getStat(statObject) + value)
    );

    const buildGameCountPartialUpdate = (didWin) => ({
        ...buildIncreasedGameStatPartialUpdate(
            didWin ? Stats.GAMES_WON : Stats.GAMES_LOST,
            1
        ),
        ...buildIncreasedGameStatPartialUpdate(Stats.TOTAL_GAMES, 1),
    });

    const isNewBestScore = (gameSize, score) => (
        getStat(BestScoreByGameSize[gameSize]) < score
    );

    const buildBestScorePartialUpdate = (gameSize, score) => ({
        ...(isNewBestScore(gameSize, score) ?
            buildIncreasedGameStatPartialUpdate(BestScoreByGameSize[gameSize], score) :
            {}
        ),
    });

    const buildGameScorePartialUpdate = (gameSize, score) => ({
        ...buildIncreasedGameStatPartialUpdate(TotalScoreByGameSize[gameSize], score),
        ...buildBestScorePartialUpdate(gameSize, score),
    });

    const handleGameScore = async (gameSize, didWin, score) => {
        const isNewBest = isNewBestScore(gameSize, score);

        await writeStats({
            ...buildGameCountPartialUpdate(didWin),
            ...(didWin ? buildGameScorePartialUpdate(gameSize, score) : {}),
        });

        return isNewBest;
    };

    const resetStats = async () => {
        await setItem(JSON.stringify(DefaultStats));
        setStats(DefaultStats);
    };

    useEffect(() => {
        readStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { stats, handleGameScore, resetStats };
};
