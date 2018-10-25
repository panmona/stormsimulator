'use strict';

// Source: https://stackoverflow.com/a/7228322
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
