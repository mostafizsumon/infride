import { Project } from '../types';
import { FirestoreRepository } from './FirestoreRepository';

export class ProjectService extends FirestoreRepository<Project> {
  constructor() {
    super('projects');
  }
}

export const projectService = new ProjectService();
