export const Route = {
  home: '/',
  userRewards: '/user-rewards',
  offset: ({ projectId }: { projectId: string }) => `/${projectId}`,
  claimReward: ({ projectId }: { projectId: string }) => `/${projectId}/reward`,
};
