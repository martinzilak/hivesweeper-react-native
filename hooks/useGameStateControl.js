import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import * as R from 'ramda';
import { useHexGridFactory } from './useHexGridFactory';
import { SCORE } from '../constants/constants';

const handleRevealCell = (hiveCell, setIsFirstRevealed, setScore, setGrid) => {
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
};

export const useGameStateControl = (gameSize) => {
    const { generateGrid } = useHexGridFactory(gameSize);

    const [grid, setGrid] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFirstRevealed, setIsFirstRevealed] = useState(false);
    const [beesRemaining, setBeesRemaining] = useState(0);
    const [score, setScore] = useState(0);

    const resetGame = useCallback(() => {
        const newGrid = generateGrid();

        setGrid(newGrid);
        setIsPlaying(true);
        setIsFirstRevealed(false);
        setBeesRemaining(R.o(
            R.length,
            R.reject(R.prop('isBee')),
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
            setScore(R.add(-SCORE.FLAG));
        } else {
            hiveCell.setIsFlagged(true);
            setScore(R.add(SCORE.FLAG));
            setBeesRemaining(R.add(-1));
        }
        
        setGrid(R.update(index, hiveCell));
    }, [isPlaying]);

    const revealCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { index, isBee, isRevealed, isFlagged, neighbors } = hiveCell;

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

                handleRevealCell(hiveCell, setIsFirstRevealed, setScore, setGrid);
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

        if (isFlagged) {
            hiveCell.setIsFlagged(false);
            setScore(R.add(-SCORE.FLAG));
            setGrid(R.update(index, hiveCell));
            return;
        }

        handleRevealCell(hiveCell, setIsFirstRevealed, setScore, setGrid);
    }, [isPlaying, isFirstRevealed]);
    
    return { grid, beesRemaining, score, resetGame, flagCell, revealCell };
};
