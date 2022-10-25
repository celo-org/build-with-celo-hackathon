const registryUrls = {
  VCS: (projectId: string) =>
    `https://registry.verra.org/app/projectDetail/VCS/${projectId}`,
};

type RegistryUrls = typeof registryUrls;
export type Registry = keyof RegistryUrls;

export const getProjectUrlByRegistry = (
  registryName: Registry,
  projectId: string
) => registryUrls[registryName](projectId);
