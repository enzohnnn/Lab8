/**
 * @jest-environment jsdom
 */
 import { pushToHistory } from '../scripts/router.js';

test('test length of history', () => {
    pushToHistory('settings', 0);
    pushToHistory('entry', 1);
    pushToHistory('entry', 2);
    expect(window.history.length).toBe(4);
});

test('test length of history with one', () => {
    pushToHistory('entry', 2);
    expect(pushToHistory('entry',1).length).toBe(6);
});

describe('current state', () => {
    test('current state is setting', () => {
        pushToHistory('settings', 0);
        expect(pushToHistory('settings', 0).state).toEqual({ page: 'settings' });
    });

    test('current state is entry', () => {
        pushToHistory('settings', 0);
        pushToHistory('entry',2);
        pushToHistory('entry',3);
        pushToHistory('entry',4);
        pushToHistory('entry',5);
        expect(pushToHistory('entry', 6).state).toEqual({ page: 'entry6' });
    });

    test('current state is nothing', () => {
        expect(pushToHistory('', 0).state).toEqual({});
    });
});