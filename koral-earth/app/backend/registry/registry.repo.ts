import { Registry } from '../market/market.entity';

type RegistryUrls = {
  [Registry.VCS]: (projectId: string) => string;
};

const registryUrls: RegistryUrls = {
  VCS: (projectId: string) =>
    `https://registry.verra.org/app/projectDetail/VCS/${projectId}`,
};

export const getProjectUrlByRegistry = (
  projectId: string,
  registryName: Registry
) => {
  const decomposedProjectId = projectId.split('-');

  return registryUrls[registryName](decomposedProjectId[1]);
};
