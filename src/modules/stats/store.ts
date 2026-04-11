import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultStats } from './constants/DefaultStats';
import {
  BestScoreStatByGameSize,
  Stat,
  TotalScoreStatByGameSize,
} from './constants/Stat';
import type { GameSizeValue, Stats } from 'hivesweeper/shared';

type StatsState = {
  stats: Stats;
  updateStats: (
    gameSize: GameSizeValue,
    didWin: boolean,
    score: number,
  ) => Promise<boolean>;
};

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      stats: DefaultStats,
      updateStats: async (gameSize, didWin, score) => {
        const { stats } = get();
        const getStat = (statObject: { key: string }) =>
          stats[statObject.key] ?? 0;

        const bestScoreStat = BestScoreStatByGameSize[gameSize];
        const totalScoreStat = TotalScoreStatByGameSize[gameSize];
        const isNewBest = getStat(bestScoreStat) < score;

        set((state) => ({
          stats: {
            ...state.stats,
            [Stat.TOTAL_GAMES.key]: getStat(Stat.TOTAL_GAMES) + 1,
            [didWin ? Stat.GAMES_WON.key : Stat.GAMES_LOST.key]:
              getStat(didWin ? Stat.GAMES_WON : Stat.GAMES_LOST) + 1,
            ...(didWin
              ? {
                  [totalScoreStat.key]: getStat(totalScoreStat) + score,
                  ...(isNewBest ? { [bestScoreStat.key]: score } : {}),
                }
              : {}),
          } as Stats,
        }));

        return isNewBest;
      },
    }),
    {
      name: '@hivesweeper_stats',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ stats: state.stats }),
    },
  ),
);
