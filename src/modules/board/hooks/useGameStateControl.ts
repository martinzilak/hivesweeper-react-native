import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { PRESS, WIN, LOSE , ActionScore , usePlaySound , useVibrate ,type  GameSizeValue,type  HiveCell,type  HiveGrid } from 'hivesweeper/shared';
import { revealAllBees , setBeeStatus , updateCell , updateCells } from 'hivesweeper/grid';
import { useHiveGridFactory } from './useHiveGridFactory';
import { useStatsStore } from 'hivesweeper/stats';

type WinCheckParams = {
  hiveGrid: HiveGrid;
  setIsPlaying: (v: boolean) => void;
  playSound: (source: number) => void;
  vibrate: () => void;
  onPopupButtonPress: () => void;
  gameSize: GameSizeValue;
  scoreRef: React.MutableRefObject<number>;
  updateStats: (gameSize: GameSizeValue, didWin: boolean, score: number) => Promise<boolean>;
};

const checkWinCondition = ({
  hiveGrid,
  setIsPlaying,
  playSound,
  vibrate,
  onPopupButtonPress,
  gameSize,
  scoreRef,
  updateStats,
}: WinCheckParams) => {
  if (Object.values(hiveGrid).every((cell) => cell.isRevealed || cell.isBee)) {
    playSound(WIN);
    vibrate();
    setIsPlaying(false);

    updateStats(gameSize, true, scoreRef.current).then((isNewBest) => {
      Alert.alert(
        'You won!',
        isNewBest ? 'New best score, congratulations!' : undefined,
        [{ text: 'Play again', onPress: onPopupButtonPress }],
      );
    });
  }
};

const handleRevealCell = (
  hiveCellId: string,
  hiveGrid: HiveGrid,
  setHasFirstCellBeenRevealed: (v: boolean) => void,
  winCheckParams: WinCheckParams,
  scoreRef: React.MutableRefObject<number>,
): HiveGrid => {
  const hiveCell = hiveGrid[hiveCellId];
  const { neighborIds, neighboringBees } = hiveCell;

  hiveCell.isRevealed = true;
  setHasFirstCellBeenRevealed(true);
  scoreRef.current += ActionScore.REVEAL_PLAYER;
  let updatedGrid = updateCell(hiveGrid, hiveCell);

  if (neighboringBees === 0) {
    let allNeighborIds = [...neighborIds];
    let updatedCells: HiveCell[] = [];

    while (allNeighborIds.length > 0) {
      const neighbor = hiveGrid[allNeighborIds[0]];
      allNeighborIds = allNeighborIds.slice(1);

      if (!neighbor.isRevealed && !neighbor.isBee && !neighbor.isFlagged) {
        neighbor.isRevealed = true;
        updatedCells = [...updatedCells, neighbor];
        scoreRef.current += ActionScore.REVEAL_AUTOMATIC;

        if (neighbor.neighboringBees === 0) {
          allNeighborIds = [...new Set([...allNeighborIds, ...neighbor.neighborIds])];
        }
      }
    }

    updatedGrid = updateCells(updatedGrid, updatedCells);
  }

  checkWinCondition({ ...winCheckParams, hiveGrid: updatedGrid });
  return updatedGrid;
};

export const useGameStateControl = (gameSize: GameSizeValue) => {
  const { generateHiveGrid } = useHiveGridFactory(gameSize);
  const { playSound } = usePlaySound();
  const { vibrate } = useVibrate();
  const updateStats = useStatsStore((s) => s.updateStats);

  const gameSizeRef = useRef(gameSize);
  useEffect(() => { gameSizeRef.current = gameSize; }, [gameSize]);

  const [hiveGrid, setHiveGrid] = useState<HiveGrid | null>(null);
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
    setFlagsRemaining(
      (Object.values(grid) as HiveCell[]).filter((cell) => cell.isBee).length,
    );
  }, [generateHiveGrid]);

  const onPopupButtonPress = useCallback(() => {
    playSound(PRESS);
    vibrate();
    resetGame();
  }, [playSound, vibrate, resetGame]);

  const flagCell = useCallback(
    (hiveCell: HiveCell) => {
      if (!isPlaying || hiveCell.isRevealed) return;

      if (hiveCell.isFlagged) {
        hiveCell.isFlagged = false;
        setFlagsRemaining((n) => n + 1);
        scoreRef.current -= ActionScore.FLAG;
      } else if (flagsRemaining > 0) {
        hiveCell.isFlagged = true;
        setFlagsRemaining((n) => n - 1);
        scoreRef.current += ActionScore.FLAG;
      }

      setHiveGrid((prev) => updateCell(prev!, hiveCell));
    },
    [isPlaying, flagsRemaining],
  );

  const revealCell = useCallback(
    (hiveCell: HiveCell) => {
      if (!isPlaying) return;

      if (hiveCell.isFlagged) {
        hiveCell.isFlagged = false;
        setFlagsRemaining((n) => n + 1);
        scoreRef.current -= ActionScore.FLAG;
        setHiveGrid((prev) => updateCell(prev!, hiveCell));
        return;
      }

      if (hiveCell.isBee) {
        if (!hasFirstCellBeenRevealed && flagsRemaining > 0) {
          setHiveGrid((prev) => {
            const updatedGrid = setBeeStatus(prev!, [hiveCell.id], false);
            setFlagsRemaining((n) => n - 1);
            const winCheckParams: WinCheckParams = {
              hiveGrid: updatedGrid,
              setIsPlaying,
              playSound,
              vibrate,
              onPopupButtonPress,
              gameSize: gameSizeRef.current,
              scoreRef,
              updateStats,
            };
            return handleRevealCell(
              hiveCell.id,
              updatedGrid,
              setHasFirstCellBeenRevealed,
              winCheckParams,
              scoreRef,
            );
          });
        } else {
          setHiveGrid((prev) => revealAllBees(prev!));
          playSound(LOSE);
          vibrate();
          setIsPlaying(false);
          updateStats(gameSizeRef.current, false, scoreRef.current).then(() => {
            Alert.alert(
              'You lost!',
              'Hint: Use the flag button to mark cells you suspect hide a hornet.',
              [{ text: 'Try again', onPress: onPopupButtonPress }],
            );
          });
        }
        return;
      }

      if (hiveCell.isRevealed) return;

      setHiveGrid((prev) => {
        const winCheckParams: WinCheckParams = {
          hiveGrid: prev!,
          setIsPlaying,
          playSound,
          vibrate,
          onPopupButtonPress,
          gameSize: gameSizeRef.current,
          scoreRef,
          updateStats,
        };
        return handleRevealCell(
          hiveCell.id,
          prev!,
          setHasFirstCellBeenRevealed,
          winCheckParams,
          scoreRef,
        );
      });
    },
    [isPlaying, playSound, vibrate, onPopupButtonPress, hasFirstCellBeenRevealed, flagsRemaining, updateStats],
  );

  return { hiveGrid, flagsRemaining, score: scoreRef.current, resetGame, flagCell, revealCell };
};
