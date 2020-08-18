import { getState, writeState } from './utils.js';

export function useLocal(keys) {
    const state = getState();
    keys.map((key) => {
        state[key] = 'use-local';
    });
    writeState(state);
    return state;
}

export function useImage(keys) {
    const state = getState();
    keys.map((key) => {
        state[key] = 'use-image';
    });
    writeState(state);
    return state;
}
