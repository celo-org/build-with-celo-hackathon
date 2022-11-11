import type { GetStaticPropsResult, NextPage, NextPageContext } from 'next';
import { getProjects } from '../../backend/market/market.repo';
import { ProjectRewards } from '../../frontend/views/rewards/Rewards';

type Props = { projectId: string };

const RewardPage: NextPage<Props> = ({ projectId }) => (
  <ProjectRewards projectId={projectId} />
);

export async function getStaticPaths() {
  const projects = await getProjects();

  const paths = projects.map((project) => ({
    params: { projectId: project.projectId },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(
  context: NextPageContext & { params: { projectId: string } }
): Promise<GetStaticPropsResult<Props>> {
  const {
    params: { projectId },
  } = context;

  return {
    props: { projectId },
  };
}

export default RewardPage;
