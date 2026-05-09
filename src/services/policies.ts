import { Policy } from '../types';
import { FirestoreRepository } from './FirestoreRepository';

export class PolicyService extends FirestoreRepository<Policy> {
  constructor() {
    super('policies');
  }
}

export const policyService = new PolicyService();
