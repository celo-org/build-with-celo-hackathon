import { Project } from './market.entity';
import toucanProjects from '../shared/data/toucanProjects.json';

export const getProjects = async (): Promise<Project[]> => {
  return toucanProjects.data.projects;
};
