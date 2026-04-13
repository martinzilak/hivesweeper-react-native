import { useEffect } from 'react';
import { LOSE, WIN, usePlaySound, useVibrate } from 'hivesweeper/shared';
import { gameEmitter } from 'hivesweeper/game';

type Props = {
  onWin: (isNewBest: boolean) => void;
  onLost: () => void;
};

export const useGameEffects = ({ onWin, onLost }: Props) => {
  const { playSound } = usePlaySound();
  const { vibrate } = useVibrate();

  useEffect(() => {
    const handleLost = () => {
      playSound(LOSE);
      vibrate();
      onLost();
    };

    const handleStatsResolved = ({
      isNewBest,
      status,
    }: {
      isNewBest: boolean;
      status: 'won' | 'lost';
    }) => {
      if (status === 'won') {
        playSound(WIN);
        vibrate();
        onWin(isNewBest);
      }
    };

    gameEmitter.on('lost', handleLost);
    gameEmitter.on('statsResolved', handleStatsResolved);
    return () => {
      gameEmitter.off('lost', handleLost);
      gameEmitter.off('statsResolved', handleStatsResolved);
    };
  }, [playSound, vibrate, onWin, onLost]);
};
