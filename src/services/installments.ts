import { Installment, Fine } from '../types';
import { FirestoreRepository } from './FirestoreRepository';

export class InstallmentService extends FirestoreRepository<Installment> {
  constructor() {
    super('installments');
  }
}

export class FineService extends FirestoreRepository<Fine> {
  constructor() {
    super('fines');
  }
}

export const installmentService = new InstallmentService();
export const fineService = new FineService();
