import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSize ,type  GameSizeValue } from 'hivesweeper/shared';
import { createGame, flagCell as engineFlagCell, revealCell as engineRevealCell ,type  GameState } from 'hivesweeper/engine';
import { useStatsStore } from 'hivesweeper/stats';
import { gameEmitter } from './emitter';

type GameStore = GameState & {
  resetGame: (gameSize: GameSizeValue) => void;
  revealCell: (cellId: string) => void;
  flagCell: (cellId: string) => void;
};

const initialState: GameState = {
  grid: null,
  gameSize: GameSize.SMALL,
  gameStatus: 'idle',
  score: 0,
  flagsRemaining: 0,
  hasFirstCellBeenRevealed: false,
  isNewBestScore: null,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      resetGame: (gameSize) => set(createGame(gameSize)),

      revealCell: (cellId) => {
        const next = engineRevealCell(get(), cellId);
        set(next);
        if (next.gameStatus === 'won' || next.gameStatus === 'lost') {
          const terminalStatus = next.gameStatus;
          gameEmitter.emit(terminalStatus, next);
          useStatsStore.getState()
            .updateStats(next.gameSize, next.gameStatus === 'won', next.score)
            .then((isNewBest) => {
              if (get().gameStatus === next.gameStatus) {
                set({ isNewBestScore: isNewBest });
                gameEmitter.emit('statsResolved', { isNewBest, status: terminalStatus });
              }
            });
        }
      },

      flagCell: (cellId) => set(engineFlagCell(get(), cellId)),
    }),
    {
      name: '@hivesweeper_game',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ grid, gameSize, gameStatus, score, flagsRemaining, hasFirstCellBeenRevealed }) =>
        gameStatus === 'playing'
          ? { grid, gameSize, gameStatus, score, flagsRemaining, hasFirstCellBeenRevealed }
          : {},
    },
  ),
);
