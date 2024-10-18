// Uncomment the code below and write your tests
import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(123);
    expect(account.getBalance()).toBe(123);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(123);
    expect(() => {
      account.withdraw(223);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(123);
    const account2 = getBankAccount(0);
    expect(() => {
      account.transfer(223, account2);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(123);
    expect(() => {
      account.transfer(223, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(123);
    account.deposit(100);
    expect(account.getBalance()).toBe(223);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(123);
    account.withdraw(100);
    expect(account.getBalance()).toBe(23);
  });

  test('should transfer money', () => {
    const account = getBankAccount(123);
    const account2 = getBankAccount(0);
    account.transfer(100, account2);
    expect(account.getBalance()).toBe(23);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(123);
    (random as jest.Mock).mockReturnValue(1);
    await expect(account.fetchBalance()).resolves.toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(123);
    (random as jest.Mock).mockReturnValue(1);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(123);
    (random as jest.Mock).mockReturnValue(0);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
