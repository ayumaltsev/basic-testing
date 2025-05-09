import {BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError} from '.';

jest.mock('lodash', () => ({random: jest.fn(),}));
import {random} from 'lodash';

describe('BankAccount', () => {

    let account: BankAccount;

    beforeEach(() => {
        account = getBankAccount(2025);
    })

    test('should create account with initial balance', async () => {
        expect(account.getBalance()).toBe(2025);
    });

    test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
        expect(() => account.withdraw(3000)).toThrow(InsufficientFundsError);
    });

    test('should throw error when transferring more than balance', () => {
        const secondAccount = getBankAccount(1000);
        expect(() => account.transfer(3000, secondAccount)).toThrow(InsufficientFundsError);
    });

    test('should throw error when transferring to the same account', () => {
        expect(() => account.transfer(1, account)).toThrow(TransferFailedError);
    });

    test('should deposit money', () => {
        account.deposit(100);
        expect(account.getBalance()).toBe(2125);
    });

    test('should withdraw money', () => {
        account.withdraw(2000);
        expect(account.getBalance()).toBe(25);
    });

    test('should transfer money', () => {
        const secondAccount = getBankAccount(1000);
        account.transfer(25, secondAccount);
        expect(account.getBalance()).toBe(2000);
        expect(secondAccount.getBalance()).toBe(1025);
    });

    test('fetchBalance should return number in case if request did not failed', async () => {
        (random as jest.Mock).mockImplementationOnce(() => 50).mockImplementationOnce(() => 1);
        const result = await account.fetchBalance();
        expect(typeof result).toBe('number');
    });

    test('should set new balance if fetchBalance returned number', async () => {
        jest.spyOn(account, 'fetchBalance' as any).mockResolvedValue(888);
        await account.synchronizeBalance();
        expect(account.getBalance()).toBe(888);
    });

    test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
        jest.spyOn(account, 'fetchBalance' as any).mockResolvedValue(null);
        await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    });
});
