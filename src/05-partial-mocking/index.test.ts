import {mockOne, mockThree, mockTwo, unmockedFunction} from './index';

jest.mock('./index', () => {
    const originalModule = jest.requireActual<typeof import('./index')>('./index');

    return {
        ...originalModule,
        mockOne: jest.fn(),
        mockTwo: jest.fn(),
        mockThree: jest.fn(),
    };
});

describe('partial mocking', () => {
    afterAll(() => {
        jest.unmock('./index');
    });

    test('mockOne, mockTwo, mockThree should not log into console', () => {
        console.log = jest.fn();
        mockOne();
        mockTwo();
        mockThree();
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    test('unmockedFunction should log into console', () => {
        console.log = jest.fn();
        unmockedFunction();
        expect(console.log).toHaveBeenCalled();
    });
});