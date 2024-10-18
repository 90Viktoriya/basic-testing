// Uncomment the code below and write your tests
import path, { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs, { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockedFunction = jest.fn();
    doStuffByTimeout(mockedFunction, 100);
    expect(setTimeout).toHaveBeenLastCalledWith(mockedFunction, 100);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockedFunction = jest.fn();
    doStuffByTimeout(mockedFunction, 100);
    expect(mockedFunction).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(mockedFunction).toHaveBeenCalled();
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
    jest.spyOn(global, 'setInterval');
    const mockedFunction = jest.fn();
    doStuffByInterval(mockedFunction, 100);
    expect(setInterval).toHaveBeenLastCalledWith(mockedFunction, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const mockedFunction = jest.fn();
    doStuffByInterval(mockedFunction, 100);
    expect(mockedFunction).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(mockedFunction).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously('testPath');
    expect(join).toHaveBeenCalledWith(__dirname, 'testPath');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync');
    (existsSync as jest.Mock).mockReturnValue(false);
    expect(await readFileAsynchronously('testPath')).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync');
    jest.spyOn(fs.promises, 'readFile');
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue('fileContent');
    expect(await readFileAsynchronously('testPath')).toBe('fileContent');
  });
});
