import {simpleCalculator, Action} from './index';

const testCases = [
    {a: 1, b: 2, action: Action.Add, expected: 3},
    {a: 2, b: 2, action: Action.Add, expected: 4},
    {a: 3, b: 2, action: Action.Add, expected: 5},

    {a: 1, b: 2, action: Action.Subtract, expected: -1},
    {a: 2, b: 2, action: Action.Subtract, expected: 0},
    {a: 3, b: 2, action: Action.Subtract, expected: 1},

    {a: 1, b: 2, action: Action.Multiply, expected: 2},
    {a: 2, b: 2, action: Action.Multiply, expected: 4},
    {a: 3, b: 2, action: Action.Multiply, expected: 6},

    {a: 10, b: 2, action: Action.Divide, expected: 5},
    {a: 2, b: 2, action: Action.Divide, expected: 1},
    {a: 100, b: 50, action: Action.Divide, expected: 2},

    {a: 2, b: 3, action: Action.Exponentiate, expected: 8},
    {a: 15, b: 2, action: Action.Exponentiate, expected: 225},
    {a: 625, b: 0.5, action: Action.Exponentiate, expected: 25},

    {a: 12, b: 20, action: 'ADD', expected: null},
    {a: 12, b: 20, action: 'Subtract', expected: null},

    {a: undefined, b: 10, action: Action.Add, expected: null},
    {a: undefined, b: 10, action: Action.Subtract, expected: null},
    {a: undefined, b: 10, action: Action.Multiply, expected: null},
    {a: undefined, b: 10, action: Action.Exponentiate, expected: null},

    {a: 'test', b: 12, action: Action.Add, expected: null},
    {a: 'test', b: 12, action: Action.Subtract, expected: null},
    {a: 'test', b: 12, action: Action.Multiply, expected: null},
    {a: 'test', b: 12, action: Action.Divide, expected: null},
    {a: 'test', b: 12, action: Action.Exponentiate, expected: null},
];

describe('simpleCalculator', () => {
    testCases.forEach(({a, b, action, expected}) => {
        test(`calculate(${a}, ${b}, \'${action}\') should return ${expected}`, () => {
            expect(simpleCalculator({a, b, action})).toBe(expected);
        });
    });
});
