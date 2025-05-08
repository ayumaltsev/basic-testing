import {generateLinkedList} from './index';

const testArray = [1, 2, 3];

describe('generateLinkedList', () => {
    // Check match by expect(...).toStrictEqual(...)
    test('should generate linked list from values 1', () => {
        const expectedOutput = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: null,
                        next: null,
                    },
                },
            },
        };

        expect(generateLinkedList(testArray)).toStrictEqual(expectedOutput);
    });

    // Check match by comparison with snapshot
    test('should generate linked list from values 2', () => {
        const list = generateLinkedList(testArray);
        expect(list).toMatchSnapshot();
    });
});
