import { GameSize } from './GameSize';

export const Stat = {
    TOTAL_GAMES: { key: 'totalGames', label: 'TOTAL GAMES PLAYED' },
    GAMES_WON: { key: 'gamesWon', label: 'GAMES WON' },
    GAMES_LOST: { key: 'gamesLost', label: 'GAMES LOST' },
    BEST_SCORE_EASY: { key: 'bestScoreEasy', label: 'BEST SCORE (EASY)' },
    TOTAL_SCORE_EASY: { key: 'totalScoreEasy', label: 'TOTAL SCORE (EASY)' },
    BEST_SCORE_MEDIUM: { key: 'bestScoreMedium', label: 'BEST SCORE (MEDIUM)' },
    TOTAL_SCORE_MEDIUM: { key: 'totalScoreMedium', label: 'TOTAL SCORE (MEDIUM)' },
    BEST_SCORE_HARD: { key: 'bestScoreHard', label: 'BEST SCORE (HARD)' },
    TOTAL_SCORE_HARD: { key: 'totalScoreHard', label: 'TOTAL SCORE (HARD)' },
};

export const BestScoreStatByGameSize = {
    [GameSize.SMALL]: Stat.BEST_SCORE_EASY,
    [GameSize.MEDIUM]: Stat.BEST_SCORE_MEDIUM,
    [GameSize.LARGE]: Stat.BEST_SCORE_HARD,
};

export const TotalScoreStatByGameSize = {
    [GameSize.SMALL]: Stat.TOTAL_SCORE_EASY,
    [GameSize.MEDIUM]: Stat.TOTAL_SCORE_MEDIUM,
    [GameSize.LARGE]: Stat.TOTAL_SCORE_HARD,
};
