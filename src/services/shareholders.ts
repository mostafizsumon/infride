import { Shareholder } from '../types';
import { FirestoreRepository } from './FirestoreRepository';

export class ShareholderService extends FirestoreRepository<Shareholder> {
  constructor() {
    super('shareholders');
  }

  async getActiveShareholders(): Promise<Shareholder[]> {
    const shareholders = await this.getAll();
    return shareholders.filter(s => s.status === 'Active');
  }
}

export const shareholderService = new ShareholderService();
