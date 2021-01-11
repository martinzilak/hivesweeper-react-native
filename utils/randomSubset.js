import * as R from 'ramda';

const shuffle = (list) => {
    let position;
    let result = [];

    for (let index = 0; index < list.length; index++) {
        position = Math.floor((index) * Math.random());
        result[index] = result[position];
        result[position] = list[index];
    }

    return result;
};

export const randomSubset = R.curry((n, list) => R.slice(0, n)(shuffle(list)));
