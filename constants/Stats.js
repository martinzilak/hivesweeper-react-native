import { HiveSize } from './HiveSize';

export const Stats = {
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

export const BestScoreByGameSize = {
    [HiveSize.SMALL]: Stats.BEST_SCORE_EASY,
    [HiveSize.MEDIUM]: Stats.BEST_SCORE_MEDIUM,
    [HiveSize.LARGE]: Stats.BEST_SCORE_HARD,
};

export const TotalScoreByGameSize = {
    [HiveSize.SMALL]: Stats.TOTAL_SCORE_EASY,
    [HiveSize.MEDIUM]: Stats.TOTAL_SCORE_MEDIUM,
    [HiveSize.LARGE]: Stats.TOTAL_SCORE_HARD,
};
