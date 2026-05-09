import { Cost } from '../types';
import { FirestoreRepository } from './FirestoreRepository';

export class CostService extends FirestoreRepository<Cost> {
  constructor() {
    super('costs');
  }
}

export const costService = new CostService();
