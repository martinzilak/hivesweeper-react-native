import * as R from 'ramda';
import { forEachIndexed } from './forEachIndexed';

const shuffle = <T>(list: T[]): T[] => {
  const result: T[] = [];

  (forEachIndexed as (fn: (item: T, index: number) => void) => (list: T[]) => void)(
    (listItem: T, index: number) => {
      const position = Math.floor(index * Math.random());
      result[index] = result[position];
      result[position] = listItem;
    },
  )(list);

  return result;
};

export const randomSubset = R.curry(<T>(n: number, list: T[]): T[] =>
  R.slice(0, n)(shuffle(list)),
);