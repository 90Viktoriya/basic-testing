// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    jest.runOnlyPendingTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/todos/1');
    expect(axiosSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create');
    const getAxios = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/todos/1');

    expect(getAxios).toBeCalledWith('/todos/1');
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'some data' });
    const result = await throttledGetDataFromApi('/todos/1');
    expect(result).toBe('some data');
  });
});
