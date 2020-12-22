import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import * as R from 'ramda';
import { useHiveGridFactory } from './useHiveGridFactory';
import { SCORE } from '../constants/constants';

const checkWinCondition = (grid, setIsPlaying) => {
    if (R.all((cell) => cell.isRevealed || cell.isBee)(grid)) {
        setIsPlaying(false);
        Alert.alert('You won!', null, 'Ok');
    }
};

const handleRevealCell = (hiveCell, setIsFirstRevealed, setScore, grid, setGrid, setIsPlaying) => {
    const { index, neighboringBees, neighbors } = hiveCell;

    hiveCell.setIsRevealed(true);
    setIsFirstRevealed(true);
    setScore(R.add(SCORE.REVEAL_PLAYER));
    setGrid(R.update(index, hiveCell));

    if (neighboringBees === 0) {
        let allNeighbors = [...neighbors];
        while (R.length(allNeighbors) > 0) {
            const neighbor = allNeighbors[0];
            allNeighbors = R.drop(1, allNeighbors);
            const ids = R.pluck('id', allNeighbors);

            const {
                index: nIndex,
                isRevealed: nIsRevealed,
                isBee: nIsBee,
                isFlagged: nIsFlagged,
                neighboringBees: nNeighboringBees,
                neighbors: nNeighbors,
            } = neighbor;

            if (!nIsRevealed && !nIsBee && ! nIsFlagged) {
                neighbor.setIsRevealed(true);
                setGrid(R.update(nIndex, neighbor));
                setScore(R.add(SCORE.REVEAL_AUTOMATIC));

                if (nNeighboringBees === 0) {
                    allNeighbors = [
                        ...allNeighbors,
                        ...R.reject(n => R.includes(n.id, ids))(nNeighbors),
                    ];
                }
            }
        }
    }

    checkWinCondition(grid, setIsPlaying);
};

export const useGameStateControl = (gameSize) => {
    const { generateGrid } = useHiveGridFactory(gameSize);

    const [grid, setGrid] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFirstRevealed, setIsFirstRevealed] = useState(false);
    const [flagsRemaining, setFlagsRemaining] = useState(0);
    const [score, setScore] = useState(0);

    const resetGame = useCallback(() => {
        const newGrid = generateGrid();

        setGrid(newGrid);
        setIsPlaying(true);
        setIsFirstRevealed(false);
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

        checkWinCondition(grid, setIsPlaying);
    }, [isPlaying, flagsRemaining, grid]);

    const revealCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { index, isBee, isRevealed, isFlagged, neighbors } = hiveCell;

        if (isFlagged) {
            hiveCell.setIsFlagged(false);
            setFlagsRemaining(R.add(1));
            setScore(R.add(-SCORE.FLAG));
            setGrid(R.update(index, hiveCell));
            return;
        }

        if (isBee) {
            if (!isFirstRevealed) {
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

                handleRevealCell(hiveCell, setIsFirstRevealed, setScore, grid, setGrid, setIsPlaying);
                return;
            } else {
                setGrid(R.forEach((cell) => {
                    if (cell.isBee) {
                        cell.setIsFlagged(false);
                        cell.setIsRevealed(true);
                    }
                }));

                setIsPlaying(false);
                Alert.alert('You lost!', null, 'Ok');

                return;
            }
        }

        if (isRevealed) {
            return;
        }

        handleRevealCell(hiveCell, setIsFirstRevealed, setScore, grid, setGrid, setIsPlaying);
    }, [isPlaying, isFirstRevealed, grid]);
    
    return { grid, flagsRemaining, score, resetGame, flagCell, revealCell };
};
