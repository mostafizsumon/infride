import { UserRole } from '../types';

export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<string>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IAuthService {
  getCurrentUser(): Promise<any>;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
}
