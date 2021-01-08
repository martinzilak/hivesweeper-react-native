import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { DefaultStats } from '../constants/DefaultStats';
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

    const writeSingleStat = async (newStat) => {
        const statsValue = {
            ...stats,
            ...newStat,
        }
        await setItem(JSON.stringify(statsValue));
        setStats(statsValue);
    };

    const resetStats = async () => {
        await setItem(JSON.stringify(DefaultStats));
        setStats(DefaultStats);
    };

    useEffect(() => {
        readStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { stats, writeSingleStat, resetStats };
};
