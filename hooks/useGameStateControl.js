import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import * as R from 'ramda';
import { BEE, CLICK, FLAG, LOSE, REVEAL, WIN } from '../assets/Sounds';
import { ActionScore } from '../constants/ActionScore';
import { useHiveGridFactory } from './useHiveGridFactory';
import { usePlaySound } from './usePlaySound';
import { useStats } from './useStats';

const checkWinCondition = (
    grid,
    setIsPlaying,
    playSound,
    resetGame,
    gameSize,
    scoreRef,
    handleGameScore,
) => {
    if (R.all((cell) => cell.isRevealed || cell.isBee)(grid)) {
        setIsPlaying(false);
        playSound(WIN);

        handleGameScore(gameSize, true, scoreRef.current).then((isNewBest) => {
            Alert.alert(
                'You won!',
                isNewBest ? 'New best score, congratulations!' : null,
                [{
                    text: 'Play again',
                    onPress: () => {
                        playSound(CLICK);
                        resetGame();
                    },
                }],
            );
        });
    }
};

const handleUnflagCell = (hiveCell, playSound, setFlagsRemaining, scoreRef) => {
    hiveCell.setIsFlagged(false);
    playSound(FLAG);
    setFlagsRemaining(R.add(1));
    scoreRef.current = scoreRef.current - ActionScore.FLAG;
};

const handleRevealCell = (
    hiveCell,
    setHasFirstCellBeenRevealed,
    grid,
    setGrid,
    setIsPlaying,
    playSound,
    resetGame,
    gameSize,
    scoreRef,
    handleGameScore,
) => {
    const { index, neighboringBees, neighbors } = hiveCell;

    hiveCell.setIsRevealed(true);
    playSound(REVEAL);

    setHasFirstCellBeenRevealed(true);
    scoreRef.current = scoreRef.current + ActionScore.REVEAL_PLAYER;
    setGrid(R.update(index, hiveCell));

    if (neighboringBees === 0) {
        let allNeighbors = [...neighbors];
        while (R.length(allNeighbors) > 0) {
            const neighbor = allNeighbors[0];
            allNeighbors = R.drop(1, allNeighbors);
            const neighborIds = R.pluck('id', allNeighbors);

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
                scoreRef.current = scoreRef.current + ActionScore.REVEAL_AUTOMATIC;

                if (neighborNeighboringBees === 0) {
                    allNeighbors = [
                        ...allNeighbors,
                        ...R.reject(({ id }) => R.includes(id, neighborIds))(neighborNeighbors),
                    ];
                }
            }
        }
    }

    checkWinCondition(grid, setIsPlaying, playSound, resetGame, gameSize, scoreRef, handleGameScore);
};

export const useGameStateControl = (gameSize) => {
    const { generateGrid } = useHiveGridFactory(gameSize);
    const { playSound } = usePlaySound();
    const { handleGameScore } = useStats();

    const gameSizeRef = useRef(gameSize);
    useEffect(() => {
        gameSizeRef.current = gameSize;
    }, [gameSize]);

    const [grid, setGrid] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasFirstCellBeenRevealed, setHasFirstCellBeenRevealed] = useState(false);
    const [flagsRemaining, setFlagsRemaining] = useState(0);

    const scoreRef = useRef(0);

    const resetGame = useCallback(() => {
        const newGrid = generateGrid();
        scoreRef.current = 0;

        setGrid(newGrid);
        setIsPlaying(true);
        setHasFirstCellBeenRevealed(false);
        setFlagsRemaining(R.o(
            R.length,
            R.filter(R.prop('isBee')),
        )(newGrid));
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
            handleUnflagCell(hiveCell, playSound, setFlagsRemaining, scoreRef);
        } else {
            if (flagsRemaining > 0) {
                hiveCell.setIsFlagged(true);
                playSound(FLAG);
                setFlagsRemaining(R.add(-1));
                scoreRef.current = scoreRef.current + ActionScore.FLAG;
            }
        }
        
        setGrid(R.update(index, hiveCell));
    }, [isPlaying, playSound, flagsRemaining]);

    const revealCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { index, isBee, isRevealed, isFlagged, neighbors } = hiveCell;

        if (isFlagged) {
            handleUnflagCell(hiveCell, playSound, setFlagsRemaining, scoreRef);
            setGrid(R.update(index, hiveCell));
            return;
        }

        if (isBee) {
            if (!hasFirstCellBeenRevealed && flagsRemaining > 0) {
                hiveCell.setIsBee(false);
                
                R.forEach((neighbor) => {
                    neighbor.setNeighboringBees(neighbor.neighboringBees - 1);
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
                    grid,
                    setGrid,
                    setIsPlaying,
                    playSound,
                    resetGame,
                    gameSizeRef.current,
                    scoreRef,
                    handleGameScore,
                );

                return;
            } else {
                playSound(BEE);

                setGrid(R.forEach((cell) => {
                    if (cell.isBee) {
                        cell.setIsFlagged(false);
                        cell.setIsRevealed(true);
                    }
                }));

                setIsPlaying(false);
                playSound(LOSE);
                
                handleGameScore(gameSizeRef.current, false, scoreRef.current).then(() => {
                    Alert.alert(
                        'You lost!',
                        'Hint: Long press to flag cells you suspect are hiding a bee inside.',
                        [{
                            text: 'Try again',
                            onPress: () => {
                                playSound(CLICK);
                                resetGame();
                            },
                        }],
                    );
                });

                return;
            }
        }

        if (isRevealed) {
            return;
        }

        handleRevealCell(
            hiveCell,
            setHasFirstCellBeenRevealed,
            grid,
            setGrid,
            setIsPlaying,
            playSound,
            resetGame,
            gameSizeRef.current,
            scoreRef,
            handleGameScore,
        );
    }, [isPlaying, playSound, hasFirstCellBeenRevealed, flagsRemaining, grid, resetGame, handleGameScore]);
    
    return { grid, flagsRemaining, score: scoreRef.current, resetGame, flagCell, revealCell };
};
