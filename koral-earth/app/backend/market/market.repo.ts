import type { Project, TCO2Token } from './market.entity';
import axios from 'axios';
import { tco2TokensQuery, projectsQuery, projectQuery } from './market.query';

type TCO2TokenResponse = {
  data: {
    tco2Tokens: TCO2Token[];
  };
};

export const getTokens = async (): Promise<TCO2Token[]> => {
  try {
    const results = await axios.post<TCO2TokenResponse>(
      'https://api.thegraph.com/subgraphs/name/toucanprotocol/matic',
      {
        query: tco2TokensQuery,
        variables: null,
      }
    );
    return results.data.data.tco2Tokens;
  } catch (error) {
    console.log(
      'Getting projects failed! Defaulting to pre-fetched tco2 tokens',
      error
    );
    return [];
  }
};

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
        query: projectsQuery,
        variables: null,
      }
    );
    return results.data.data.projects;
  } catch (error) {
    console.log(
      'Getting projects failed! Defaulting to pre-fetched projects',
      error
    );
    return [];
  }
};

type ProjectResponse = {
  data: {
    projects: Project[];
  };
};

export const getProject = async (
  projectId: string
): Promise<Project | null> => {
  try {
    const results = await axios.post<ProjectResponse>(
      'https://api.thegraph.com/subgraphs/name/toucanprotocol/matic',
      {
        query: projectQuery(projectId),
        variables: null,
      }
    );
    return results.data.data.projects[0];
  } catch (error) {
    console.log(
      'Getting projects failed! Defaulting to pre-fetched projects',
      error
    );
    return null;
  }
};
