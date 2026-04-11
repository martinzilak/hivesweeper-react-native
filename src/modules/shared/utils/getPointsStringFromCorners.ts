export const getPointsStringFromCorners = (
  corners: { x: number; y: number }[],
): string => corners.map(({ x, y }) => `${x},${y}`).join(' ');
