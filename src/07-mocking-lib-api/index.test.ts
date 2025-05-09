import axios from 'axios';
import {throttledGetDataFromApi} from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {

    let mockGet: jest.Mock;

    beforeEach(() => {
        jest.useFakeTimers();
        mockGet = jest.fn().mockResolvedValue({data: {response: 'TEST'}});
        (axios.create as jest.Mock).mockReturnValue({get: mockGet});
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    afterAll(() => {
        jest.unmock('axios');
    });

    test('should create instance with provided base url', async () => {
        await throttledGetDataFromApi('/good-api');
        jest.runAllTimers();
        expect(axios.create).toHaveBeenCalledWith({baseURL: 'https://jsonplaceholder.typicode.com'});
    });

    test('should perform request to correct provided url', async () => {
        await throttledGetDataFromApi('/good-api');

        jest.runAllTimers();

        expect(mockGet).toHaveBeenCalledWith('/good-api');
    });

    test('should return response data', async () => {
        const data = await throttledGetDataFromApi('/good-api');
        jest.runAllTimers();
        expect(data).toEqual({response: 'TEST'});
    });

});