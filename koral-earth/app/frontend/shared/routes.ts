export const Route = {
  offset: ({ projectId }: { projectId: string }) => `/${projectId}`,
  claimReward: ({ projectId }: { projectId: string }) => `/${projectId}/reward`,
};
