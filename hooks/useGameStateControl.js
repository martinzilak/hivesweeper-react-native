import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import * as R from 'ramda';
import { BEE, CLICK, FLAG, LOSE, REVEAL, WIN } from '../assets/Sounds';
import { ActionScore } from '../constants/ActionScore';
import { revealAllBees } from '../utils/gridUtils/revealAllBees';
import { setBeeStatus } from '../utils/gridUtils/setBeeStatus';
import { updateCell } from '../utils/gridUtils/updateCell';
import { updateCells } from '../utils/gridUtils/updateCells';
import { useHiveGridFactory } from './useHiveGridFactory';
import { usePlaySound } from './usePlaySound';
import { useStats } from './useStats';

const checkWinCondition = (
    hiveGrid,
    setIsPlaying,
    playSound,
    resetGame,
    gameSize,
    scoreRef,
    updateStats,
) => {
    if (R.all((cell) => cell.isRevealed || cell.isBee)(R.values(hiveGrid))) {
        playSound(WIN);
        setIsPlaying(false);

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
    playSound(FLAG);
    hiveCell.isFlagged = false;
    setFlagsRemaining(R.add(1));
    scoreRef.current = scoreRef.current - ActionScore.FLAG;
};

const handleRevealCell = (
    hiveCellId,
    hiveGrid,
    setHasFirstCellBeenRevealed,
    setIsPlaying,
    playSound,
    resetGame,
    gameSize,
    scoreRef,
    updateStats,
) => {
    const hiveCell = hiveGrid[hiveCellId];
    const { neighborIds, neighboringBees } = hiveCell;

    playSound(REVEAL);
    hiveCell.isRevealed = true;

    setHasFirstCellBeenRevealed(true);
    scoreRef.current = scoreRef.current + ActionScore.REVEAL_PLAYER;
    let updatedGrid = updateCell(hiveGrid, hiveCell);

    if (neighboringBees === 0) {
        let allNeighborIds = [...neighborIds];
        let updatedCells = [];

        while (R.length(allNeighborIds) > 0) {
            const neighbor = hiveGrid[allNeighborIds[0]];
            allNeighborIds = R.drop(1, allNeighborIds);

            const {
                isRevealed: neighborIsRevealed,
                isBee: neighborIsBee,
                isFlagged: neighborIsFlagged,
                neighboringBees: neighborNeighboringBees,
                neighborIds: neighborNeighborIds,
            } = neighbor;

            if (!neighborIsRevealed && !neighborIsBee && !neighborIsFlagged) {
                neighbor.isRevealed = true;
                updatedCells = R.append(neighbor, updatedCells);
                scoreRef.current = scoreRef.current + ActionScore.REVEAL_AUTOMATIC;

                if (neighborNeighboringBees === 0) {
                    allNeighborIds = R.union(allNeighborIds, neighborNeighborIds);
                }
            }
        }

        updatedGrid = updateCells(updatedGrid, updatedCells);
    }

    checkWinCondition(updatedGrid, setIsPlaying, playSound, resetGame, gameSize, scoreRef, updateStats);
    return updatedGrid;
};

export const useGameStateControl = (gameSize) => {
    const { generateHiveGrid } = useHiveGridFactory(gameSize);
    const { playSound } = usePlaySound();
    const { updateStats } = useStats();

    const gameSizeRef = useRef(gameSize);
    useEffect(() => {
        gameSizeRef.current = gameSize;
    }, [gameSize]);

    const [hiveGrid, setHiveGrid] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasFirstCellBeenRevealed, setHasFirstCellBeenRevealed] = useState(false);
    const [flagsRemaining, setFlagsRemaining] = useState(0);

    const scoreRef = useRef(0);

    const resetGame = useCallback(() => {
        const grid = generateHiveGrid();
        
        scoreRef.current = 0;
        setHiveGrid(grid);
        
        setIsPlaying(true);
        setHasFirstCellBeenRevealed(false);
        setFlagsRemaining(R.compose(
            R.length,
            R.filter(R.prop('isBee')),
            R.values,
        )(grid));
    }, [generateHiveGrid]);

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
                playSound(FLAG);
                hiveCell.isFlagged = true;
                setFlagsRemaining(R.add(-1));
                scoreRef.current = scoreRef.current + ActionScore.FLAG;
            }
        }

        setHiveGrid((previousHiveGrid) => updateCell(previousHiveGrid, hiveCell));
    }, [isPlaying, playSound, flagsRemaining]);

    const revealCell = useCallback((hiveCell) => {
        if (!isPlaying) {
            return;
        }

        const { isBee, isRevealed, isFlagged } = hiveCell;

        if (isFlagged) {
            handleUnflagCell(hiveCell, playSound, setFlagsRemaining, scoreRef);
            setHiveGrid((previousHiveGrid) => updateCell(previousHiveGrid, hiveCell));
            return;
        }

        if (isBee) {
            if (!hasFirstCellBeenRevealed && flagsRemaining > 0) {
                setHiveGrid((previousHiveGrid) => {
                    let updatedGrid = setBeeStatus(previousHiveGrid, [hiveCell.id], false);

                    setFlagsRemaining(R.add(-1));

                    handleRevealCell(
                        hiveCell.id,
                        updatedGrid,
                        setHasFirstCellBeenRevealed,
                        setIsPlaying,
                        playSound,
                        resetGame,
                        gameSizeRef.current,
                        scoreRef,
                        updateStats,
                    );

                    return updatedGrid;
                });
            } else {
                playSound(BEE);
                setHiveGrid((previousHiveGrid) => revealAllBees(previousHiveGrid));

                playSound(LOSE);
                setIsPlaying(false);

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

        setHiveGrid((previousHiveGrid) => handleRevealCell(
            hiveCell.id,
            previousHiveGrid,
            setHasFirstCellBeenRevealed,
            setIsPlaying,
            playSound,
            resetGame,
            gameSizeRef.current,
            scoreRef,
            updateStats,
        ))
    }, [isPlaying, playSound, hasFirstCellBeenRevealed, flagsRemaining, resetGame, updateStats]);
    
    return {
        hiveGrid,
        flagsRemaining,
        score: scoreRef.current,
        resetGame,
        flagCell,
        revealCell,
    };
};
