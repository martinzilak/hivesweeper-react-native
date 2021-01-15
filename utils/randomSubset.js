import * as R from 'ramda';
import { forEachIndexed } from './forEachIndexed';

const shuffle = (list) => {
    let result = [];

    forEachIndexed((listItem, index) => {
        const position = Math.floor((index) * Math.random());
        result[index] = result[position];
        result[position] = listItem;
    })(list);

    return result;
};

export const randomSubset = R.curry((n, list) => R.slice(0, n)(shuffle(list)));
