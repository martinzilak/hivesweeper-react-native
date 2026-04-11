import { useCallback, useEffect, useState } from 'react';
import { DefaultStats } from '../constants/DefaultStats';
import { BestScoreStatByGameSize, Stat, TotalScoreStatByGameSize } from '../constants/Stat';
import { getStatsItem, setStatsItem } from '../utils/AsyncStorage';
import type { GameSizeValue, Stats } from '../types/game';

export const useStats = () => {
  const [stats, setStats] = useState<Stats>(DefaultStats);

  const readStats = useCallback(async () => {
    const loaded = await getStatsItem();
    if (loaded) setStats(loaded);
  }, []);

  const getStat = useCallback(
    (statObject: { key: string }) => stats[statObject.key] ?? 0,
    [stats],
  );

  const writeStats = useCallback(
    async (update: Partial<Stats>) => {
      const newStats = { ...stats, ...update } as Stats;
      await setStatsItem(newStats);
      setStats(newStats);
    },
    [stats],
  );

  const updateStats = useCallback(
    async (gameSize: GameSizeValue, didWin: boolean, score: number): Promise<boolean> => {
      const bestScoreStat = BestScoreStatByGameSize[gameSize];
      const totalScoreStat = TotalScoreStatByGameSize[gameSize];
      const isNewBest = getStat(bestScoreStat) < score;

      await writeStats({
        [Stat.TOTAL_GAMES.key]: getStat(Stat.TOTAL_GAMES) + 1,
        [didWin ? Stat.GAMES_WON.key : Stat.GAMES_LOST.key]:
          getStat(didWin ? Stat.GAMES_WON : Stat.GAMES_LOST) + 1,
        ...(didWin
          ? {
              [totalScoreStat.key]: getStat(totalScoreStat) + score,
              ...(isNewBest ? { [bestScoreStat.key]: score } : {}),
            }
          : {}),
      });

      return isNewBest;
    },
    [getStat, writeStats],
  );

  useEffect(() => {
    readStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stats, updateStats };
};