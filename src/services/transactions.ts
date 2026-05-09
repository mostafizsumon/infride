import { Transaction } from '../types/transactions';
import { FirestoreRepository } from './FirestoreRepository';

export class TransactionService extends FirestoreRepository<Transaction> {
  constructor() {
    super('transactions');
  }
}

export const transactionService = new TransactionService();
