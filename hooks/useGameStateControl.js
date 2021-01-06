import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import * as R from 'ramda';
import { BEE, CLICK, FLAG, LOSE, REVEAL, WIN } from '../assets/Sounds';
import { ActionScore } from '../constants/ActionScore';
import { useHiveGridFactory } from './useHiveGridFactory';
import { useGameSettings } from './useGameSettings';

const checkWinCondition = (grid, setIsPlaying, isSoundEnabled, resetGame) => {
    if (R.all((cell) => cell.isRevealed || cell.isBee)(grid)) {
        setIsPlaying(false);

        if (isSoundEnabled) {
            WIN.play();
        }

        Alert.alert(
            'You won!',
            null,
            [{
                text: 'Play again',
                onPress: () => {
                    if (isSoundEnabled) {
                        CLICK.play();
                    }
                    resetGame();
                },
            }],
        );
    }
};

const handleRevealCell = (
    hiveCell,
    setHasFirstCellBeenRevealed,
    setScore,
    grid,
    setGrid,
    setIsPlaying,
    isSoundEnabled,
    resetGame,
) => {
    const { index, neighboringBees, neighbors } = hiveCell;

    hiveCell.setIsRevealed(true);

    if (isSoundEnabled) {
        REVEAL.play();
    }

    setHasFirstCellBeenRevealed(true);
    setScore(R.add(ActionScore.REVEAL_PLAYER));
    setGrid(R.update(index, hiveCell));

    if (neighboringBees === 0) {
        let allNeighbors = [...neighbors];
        while (R.length(allNeighbors) > 0) {
            const neighbor = allNeighbors[0];
            allNeighbors = R.drop(1, allNeighbors);
            const ids = R.pluck('id', allNeighbors);

            const {
                index: neighborIndex,
                isRevealed: neighborIsRevealed,
                isBee: neighborIsBee,
                isFlagged: neighborIsFlagged,
                neighboringBees: neighborNeighboringBees,
                neighbors: neighborNeighbors,
            } = neighbor;

            if (!neighborIsRevealed && !neighborIsBee && !neighborIsFlagged) {
                neighbor.setIsRevealed(true);
                setGrid(R.update(neighborIndex, neighbor));
                setScore(R.add(ActionScore.REVEAL_AUTOMATIC));

                if (neighborNeighboringBees === 0) {
                    allNeighbors = [
                        ...allNeighbors,
                        ...R.reject(n => R.includes(n.id, ids))(neighborNeighbors),
                    ];
                }
            }
        }
    }

    checkWinCondition(grid, setIsPlaying, isSoundEnabled, resetGame);
};

export const useGameStateControl = (gameSize) => {
    const { generateGrid } = useHiveGridFactory(gameSize);
    const { isSoundEnabled } = useGameSettings();

    const [grid, setGrid] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasFirstCellBeenRevealed, setHasFirstCellBeenRevealed] = useState(false);
    const [flagsRemaining, setFlagsRemaining] = useState(0);
    const [score, setScore] = useState(0);

    const resetGame = useCallback(() => {
        const newGrid = generateGrid();

        setGrid(newGrid);
        setIsPlaying(true);
        setHasFirstCellBeenRevealed(false);
        setFlagsRemaining(R.o(
            R.length,
            R.filter(R.prop('isBee')),
        )(newGrid));
        setScore(0);
    }, [generateGrid]);

    const flagCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { index, isRevealed, isFlagged } = hiveCell;

        if (isRevealed) {
            return;
        }

        if (isFlagged) {
            hiveCell.setIsFlagged(false);
            if (isSoundEnabled) {
                FLAG.play();
            }
            setFlagsRemaining(R.add(1));
            setScore(R.add(-ActionScore.FLAG));
        } else {
            if (flagsRemaining > 0) {
                hiveCell.setIsFlagged(true);
                if (isSoundEnabled) {
                    FLAG.play();
                }
                setFlagsRemaining(R.add(-1));
                setScore(R.add(ActionScore.FLAG));
            }
        }
        
        setGrid(R.update(index, hiveCell));

        checkWinCondition(grid, setIsPlaying, isSoundEnabled, resetGame);
    }, [isPlaying, isSoundEnabled, flagsRemaining, grid, resetGame]);

    const revealCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { index, isBee, isRevealed, isFlagged, neighbors } = hiveCell;

        if (isFlagged) {
            hiveCell.setIsFlagged(false);

            if (isSoundEnabled) {
                FLAG.play();
            }

            setFlagsRemaining(R.add(1));
            setScore(R.add(-ActionScore.FLAG));
            setGrid(R.update(index, hiveCell));
            return;
        }

        if (isBee) {
            if (!hasFirstCellBeenRevealed) {
                hiveCell.setIsBee(false);
                
                R.forEach((n) => {
                    n.setNeighboringBees(n.neighboringBees - 1);
                })(neighbors);

                const updatedCells = R.reduce((accumulatedCells, cell) => ({
                    ...accumulatedCells,
                    [cell.index]: cell,
                }), {})([hiveCell, ...neighbors]);
                setGrid(R.map((cell) => updatedCells[cell.index] ?? cell));

                setFlagsRemaining(R.add(-1));

                handleRevealCell(
                    hiveCell,
                    setHasFirstCellBeenRevealed,
                    setScore,
                    grid,
                    setGrid,
                    setIsPlaying,
                    isSoundEnabled,
                    resetGame,
                );

                return;
            } else {
                if (isSoundEnabled) {
                    BEE.play();
                }

                setGrid(R.forEach((cell) => {
                    if (cell.isBee) {
                        cell.setIsFlagged(false);
                        cell.setIsRevealed(true);
                    }
                }));

                setIsPlaying(false);

                if (isSoundEnabled) {
                    LOSE.play();
                }

                Alert.alert(
                    'You lost!',
                    'Hint: Long press to flag cells you suspect are hiding a bee inside.',
                    [{
                        text: 'Try again',
                        onPress: () => {
                            if (isSoundEnabled) {
                                CLICK.play();
                            }
                            resetGame();
                        },
                    }],
                );

                return;
            }
        }

        if (isRevealed) {
            return;
        }

        handleRevealCell(
            hiveCell,
            setHasFirstCellBeenRevealed,
            setScore,
            grid,
            setGrid,
            setIsPlaying,
            isSoundEnabled,
            resetGame,
        );
    }, [isPlaying, isSoundEnabled, hasFirstCellBeenRevealed, grid, resetGame]);
    
    return { grid, flagsRemaining, score, resetGame, flagCell, revealCell };
};
