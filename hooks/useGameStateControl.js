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
    updateStats,
) => {
    if (R.all((cell) => cell.isRevealed || cell.isBee)(grid.getPrimitiveGrid())) {
        setIsPlaying(false);
        playSound(WIN);

        updateStats(gameSize, true, scoreRef.current).then((isNewBest) => {
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
    updateStats,
) => {
    const { neighborIds, neighboringBees } = hiveCell;

    hiveCell.setIsRevealed(true);
    playSound(REVEAL);

    setHasFirstCellBeenRevealed(true);
    scoreRef.current = scoreRef.current + ActionScore.REVEAL_PLAYER;
    setGrid((oldGrid) => oldGrid.updateCell(hiveCell));

    if (neighboringBees === 0) {
        let allNeighborIds = [...neighborIds];
        let updatedCells = [];

        while (R.length(allNeighborIds) > 0) {
            const neighbor = grid.getCellWithId(allNeighborIds[0]);
            allNeighborIds = R.drop(1, allNeighborIds);

            const {
                isRevealed: neighborIsRevealed,
                isBee: neighborIsBee,
                isFlagged: neighborIsFlagged,
                neighboringBees: neighborNeighboringBees,
                neighborIds: neighborNeighborIds,
            } = neighbor;

            if (!neighborIsRevealed && !neighborIsBee && !neighborIsFlagged) {
                neighbor.setIsRevealed(true);
                updatedCells = R.append(updatedCells, neighbor);
                scoreRef.current = scoreRef.current + ActionScore.REVEAL_AUTOMATIC;

                if (neighborNeighboringBees === 0) {
                    allNeighborIds = R.union(allNeighborIds, neighborNeighborIds);
                }
            }
        }

        setGrid((oldGrid) => oldGrid.updateCells(updatedCells));
    }

    checkWinCondition(grid, setIsPlaying, playSound, resetGame, gameSize, scoreRef, updateStats);
};

export const useGameStateControl = (gameSize) => {
    const { generateGrid } = useHiveGridFactory(gameSize);
    const { playSound } = usePlaySound();
    const { updateStats } = useStats();

    const gameSizeRef = useRef(gameSize);
    useEffect(() => {
        gameSizeRef.current = gameSize;
    }, [gameSize]);

    const [grid, setGrid] = useState({});
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
        setFlagsRemaining(newGrid.getCountOfCellsWithBeeStatus(true));
    }, [generateGrid]);

    const flagCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { isRevealed, isFlagged } = hiveCell;

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

        setGrid((oldGrid) => oldGrid.updateCell(hiveCell));
    }, [isPlaying, playSound, flagsRemaining]);

    const revealCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { isBee, isRevealed, isFlagged } = hiveCell;

        if (isFlagged) {
            handleUnflagCell(hiveCell, playSound, setFlagsRemaining, scoreRef);
            setGrid((oldGrid) => oldGrid.updateCell(hiveCell));
            return;
        }

        if (isBee) {
            if (!hasFirstCellBeenRevealed && flagsRemaining > 0) {
                setGrid((oldGrid) => oldGrid.changeBeeStatusForCellWithId(hiveCell.id, false));

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
                    updateStats,
                );

                return;
            } else {
                playSound(BEE);

                setGrid((oldGrid) => oldGrid.revealAllBees());

                setIsPlaying(false);
                playSound(LOSE);
                
                updateStats(gameSizeRef.current, false, scoreRef.current).then(() => {
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
            updateStats,
        );
    }, [isPlaying, playSound, hasFirstCellBeenRevealed, flagsRemaining, grid, resetGame, updateStats]);
    
    return { grid, flagsRemaining, score: scoreRef.current, resetGame, flagCell, revealCell };
};
