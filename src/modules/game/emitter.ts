import mitt from 'mitt';
import type { GameState, GameStatus } from 'hivesweeper/engine';

type GameEvents = {
  won: GameState;
  lost: GameState;
  statsResolved: { isNewBest: boolean; status: Extract<GameStatus, 'won' | 'lost'> };
};

export const gameEmitter = mitt<GameEvents>();
