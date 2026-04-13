import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Returns true when the primary input is a mouse/trackpad (hover + fine pointer).
 * Always false on native and on touch-only web (mobile browsers).
 */
export const useIsPointerDevice = () => {
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsPointer(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isPointer;
};