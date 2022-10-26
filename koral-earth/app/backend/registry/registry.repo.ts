import { Registry } from '../market/market.entity';

type RegistryUrls = {
  [Registry.VCS]: (projectId: string) => string;
};

const registryUrls: RegistryUrls = {
  VCS: (projectId: string) =>
    `https://registry.verra.org/app/projectDetail/VCS/${projectId}`,
};

export const getProjectUrlByRegistry = (
  registryName: Registry,
  projectId: string
) => registryUrls[registryName](projectId);
