import {readFileAsynchronously, doStuffByTimeout, doStuffByInterval} from '.';
import {join} from "path";
import {existsSync} from "fs";
import {readFile} from "fs/promises";

jest.mock('path', () => ({
    join: jest.fn()
}));

jest.mock('fs', () => ({
    existsSync: jest.fn()
}));

jest.mock('fs/promises', () => ({
    readFile: jest.fn()
}));

describe('doStuffByTimeout', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should set timeout with provided callback and timeout', () => {
        let timeoutSpy = jest.spyOn(globalThis, 'setTimeout' as any);
        const mockCallback = jest.fn();
        const timeout = 1000;
        doStuffByTimeout(mockCallback, timeout);
        expect(timeoutSpy).toHaveBeenCalledWith(mockCallback, timeout);
    });

    test('should call callback only after timeout', () => {
        const callback = jest.fn();
        const timeout = 1000;
        doStuffByTimeout(callback, timeout);
        expect(callback).not.toHaveBeenCalled();
        jest.advanceTimersByTime(timeout);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});

describe('doStuffByInterval', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should set interval with provided callback and timeout', () => {
        let intervalSpy = jest.spyOn(globalThis, 'setInterval' as any);
        const mockCallback = jest.fn();
        const timeout = 1000;
        doStuffByInterval(mockCallback, timeout);
        expect(intervalSpy).toHaveBeenCalledWith(mockCallback, timeout);
    });

    test('should call callback multiple times after multiple intervals', () => {
        const mockCallback = jest.fn();
        const interval = 500;
        doStuffByInterval(mockCallback, interval);
        const times = 3;
        jest.advanceTimersByTime(interval * times);
        expect(mockCallback).toHaveBeenCalledTimes(times);
    });
});

describe('readFileAsynchronously', () => {

    test('should call join with pathToFile', async () => {
        const pathToFile = 'test.txt';
        await readFileAsynchronously(pathToFile);
        expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
    });

    test('should return null if file does not exist', async () => {
        (existsSync as jest.Mock).mockReturnValue(false);
        const result = await readFileAsynchronously('test-file');
        expect(result).toBeNull();
    });

    test('should return file content if file exists', async () => {
        const mockContent = 'Test file content';
        (existsSync as jest.Mock).mockReturnValue(true);
        (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockContent));
        const result = await readFileAsynchronously('test.txt');
        expect(result).toBe(mockContent)
    });
});