import { Project } from './market.entity';
import toucanProjects from '../shared/data/toucanProjects.json';
import axios from 'axios';

type ProjectsResponse = {
  data: {
    projects: Project[];
  };
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const results = await axios.post<ProjectsResponse>(
      'https://api.thegraph.com/subgraphs/name/toucanprotocol/matic',
      {
        query: `{
        projects(where: {}) {
          region
          standard
          methodology
          projectId
          vintages {
            id
          }
        }
      }`,
        variables: null,
      }
    );
    return results.data.data.projects;
  } catch (error) {
    console.log(
      'Getting projects failed! Defaulting to pre-fetched projects',
      error
    );
    return toucanProjects.data.projects as Project[];
  }
};
