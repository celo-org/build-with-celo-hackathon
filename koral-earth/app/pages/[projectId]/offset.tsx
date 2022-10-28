import type { GetStaticPropsResult, NextPage, NextPageContext } from 'next';
import { getProjects } from '../../backend/market/market.repo';

type Props = {};

const OffsetPage: NextPage<Props> = () => {
  return <></>;
};

export async function getStaticPaths() {
  const projects = await getProjects();

  const paths = projects.map((project) => ({
    params: { projectId: project.projectId },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(
  _context: NextPageContext
): Promise<GetStaticPropsResult<Props>> {
  return {
    props: {},
  };
}

export default OffsetPage;
