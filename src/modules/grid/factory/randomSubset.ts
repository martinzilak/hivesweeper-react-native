const shuffle = <T>(list: T[]): T[] => {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const randomSubset =
  (n: number) =>
  <T>(list: T[]): T[] =>
    shuffle(list).slice(0, n);
