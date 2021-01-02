import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import * as R from 'ramda';
import { useHiveGridFactory } from './useHiveGridFactory';
import { SCORE } from '../constants/Constants';
import { BEE, CLICK, FLAG, LOSE, REVEAL, WIN } from '../assets/Sounds';
import { useGameSettings } from './useGameSettings';

const checkWinCondition = (grid, setIsPlaying, isSoundEnabled) => {
    if (R.all((cell) => cell.isRevealed || cell.isBee)(grid)) {
        setIsPlaying(false);

        if (isSoundEnabled) {
            WIN.play();
        }

        Alert.alert(
            'You won!',
            null,
            [{
                text: 'Ok',
                onPress: () => {
                    if (isSoundEnabled) {
                        CLICK.play();
                    }
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
) => {
    const { index, neighboringBees, neighbors } = hiveCell;

    hiveCell.setIsRevealed(true);

    if (isSoundEnabled) {
        REVEAL.play();
    }

    setHasFirstCellBeenRevealed(true);
    setScore(R.add(SCORE.REVEAL_PLAYER));
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
                setScore(R.add(SCORE.REVEAL_AUTOMATIC));

                if (neighborNeighboringBees === 0) {
                    allNeighbors = [
                        ...allNeighbors,
                        ...R.reject(n => R.includes(n.id, ids))(neighborNeighbors),
                    ];
                }
            }
        }
    }

    checkWinCondition(grid, setIsPlaying, isSoundEnabled);
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

        if (isSoundEnabled) {
            FLAG.play();
        }

        if (isFlagged) {
            hiveCell.setIsFlagged(false);
            setFlagsRemaining(R.add(1));
            setScore(R.add(-SCORE.FLAG));
        } else {
            if (flagsRemaining > 0) {
                hiveCell.setIsFlagged(true);
                setFlagsRemaining(R.add(-1));
                setScore(R.add(SCORE.FLAG));
            }
        }
        
        setGrid(R.update(index, hiveCell));

        checkWinCondition(grid, setIsPlaying, isSoundEnabled);
    }, [isPlaying, isSoundEnabled, flagsRemaining, grid]);

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
            setScore(R.add(-SCORE.FLAG));
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
                    null,
                    [{
                        text: 'Ok',
                        onPress: () => {
                            if (isSoundEnabled) {
                                CLICK.play();
                            }
                        },
                    }],
                );

                return;
            }
        }

        if (isRevealed) {
            return;
        }

        handleRevealCell(hiveCell, setHasFirstCellBeenRevealed, setScore, grid, setGrid, setIsPlaying, isSoundEnabled);
    }, [isPlaying, isSoundEnabled, hasFirstCellBeenRevealed, grid]);
    
    return { grid, flagsRemaining, score, resetGame, flagCell, revealCell };
};
