import {simpleCalculator, Action} from './index';

describe('simpleCalculator tests', () => {
    test('should add two numbers', () => {
        expect(simpleCalculator({a: 15, b: 22, action: Action.Add})).toBe(37);
        expect(simpleCalculator({a: -15, b: 22, action: Action.Add})).toBe(7);
        expect(simpleCalculator({a: 15, b: -22, action: Action.Add})).toBe(-7);
        expect(simpleCalculator({a: -15, b: -22, action: Action.Add})).toBe(-37);
        expect(simpleCalculator({a: 3.7, b: 8.3, action: Action.Add})).toBeCloseTo(12.0, 3);
    });

    test('should subtract two numbers', () => {
        expect(simpleCalculator({a: 100, b: 10, action: Action.Subtract})).toBe(90);
        expect(simpleCalculator({a: 10, b: 100, action: Action.Subtract})).toBe(-90);
        expect(simpleCalculator({a: -100, b: -10, action: Action.Subtract})).toBe(-90);
        expect(simpleCalculator({a: 10, b: -100, action: Action.Subtract})).toBe(110);
        expect(simpleCalculator({a: 19.82, b: 18.91, action: Action.Subtract})).toBeCloseTo(0.91, 3);
    });

    test('should multiply two numbers', () => {
        expect(simpleCalculator({a: 15, b: 135, action: Action.Multiply})).toBe(2025);
        expect(simpleCalculator({a: -15, b: 135, action: Action.Multiply})).toBe(-2025);
        expect(simpleCalculator({a: 15, b: -135, action: Action.Multiply})).toBe(-2025);
        expect(simpleCalculator({a: -15, b: -135, action: Action.Multiply})).toBe(2025);
        expect(simpleCalculator({a: 25.123, b: 8.294, action: Action.Multiply})).toBeCloseTo(208.370162, 7);
    });

    test('should divide two numbers', () => {
        expect(simpleCalculator({a: 2025, b: 135, action: Action.Divide})).toBe(15);
        expect(simpleCalculator({a: -2025, b: 135, action: Action.Divide})).toBe(-15);
        expect(simpleCalculator({a: 2025, b: -135, action: Action.Divide})).toBe(-15);
        expect(simpleCalculator({a: 8.82225, b: 2.25, action: Action.Divide})).toBeCloseTo(3.921, 5);
    });

    test('should exponentiate two numbers', () => {
        expect(simpleCalculator({a: 2, b: 3, action: Action.Exponentiate})).toBe(8);
        expect(simpleCalculator({a: 15, b: 2, action: Action.Exponentiate})).toBe(225);
        expect(simpleCalculator({a: 625, b: 0.5, action: Action.Exponentiate})).toBeCloseTo(25, 5);
        expect(simpleCalculator({a: 0.0001, b: -0.25, action: Action.Exponentiate})).toBeCloseTo(10, 5);
    });

    test('should return null for invalid action', () => {
        expect(simpleCalculator({a: 12, b: 20, action: 'ADD'})).toBeNull();
        expect(simpleCalculator({a: 12, b: 20, action: 'Subtract'})).toBeNull();
    });

    test('should return null for invalid arguments', () => {
        expect(simpleCalculator({a: undefined, b: 0.5, action: Action.Add})).toBeNull();
        expect(simpleCalculator({a: 12, b: undefined, action: Action.Add})).toBeNull();
        expect(simpleCalculator({a: undefined, b: 12, action: Action.Subtract})).toBeNull();
        expect(simpleCalculator({a: 94, b: undefined, action: Action.Subtract})).toBeNull();
        expect(simpleCalculator({a: undefined, b: 2, action: Action.Multiply})).toBeNull();
        expect(simpleCalculator({a: 12, b: undefined, action: Action.Multiply})).toBeNull();
        expect(simpleCalculator({a: undefined, b: 12, action: Action.Divide})).toBeNull();
        expect(simpleCalculator({a: 12, b: undefined, action: Action.Divide})).toBeNull();
        expect(simpleCalculator({a: undefined, b: 1, action: Action.Exponentiate})).toBeNull();
        expect(simpleCalculator({a: -4, b: undefined, action: Action.Exponentiate})).toBeNull();

        expect(simpleCalculator({a: 'test', b: 12, action: Action.Add})).toBeNull();
        expect(simpleCalculator({a: 'test', b: 12, action: Action.Subtract})).toBeNull();
        expect(simpleCalculator({a: 'test', b: 12, action: Action.Multiply})).toBeNull();
        expect(simpleCalculator({a: 'test', b: 12, action: Action.Divide})).toBeNull();
        expect(simpleCalculator({a: 'test', b: 12, action: Action.Exponentiate})).toBeNull();
    });
});