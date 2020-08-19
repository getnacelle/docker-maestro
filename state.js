const { getState, writeState } = require('./utils.js');
const generate = require('./generate.js');

const useLocal = (keys) => {
    const state = getState();
    keys.map((key) => {
        state[key] = 'use-local';
    });
    writeState(state);
    generate();
    return state;
};

const useImage = (keys) => {
    const state = getState();
    keys.map((key) => {
        state[key] = 'use-image';
    });
    writeState(state);
    generate();
    return state;
};

module.exports = { useLocal, useImage };
