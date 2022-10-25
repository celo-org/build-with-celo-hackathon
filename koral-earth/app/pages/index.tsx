import type { GetStaticPropsResult, NextPage, NextPageContext } from 'next';
import { Project } from '../backend/market/market.entity';
import { Market } from '../frontend/views/market/Market';
import { getProjects } from '../backend/market/market.repo';

type Props = {
  projects: Project[];
};

const Home: NextPage<Props> = ({ projects }) => <Market projects={projects} />;

export const getStaticProps = async (
  _context: NextPageContext
): Promise<GetStaticPropsResult<Props>> => {
  const projects = await getProjects();

  return {
    props: { projects },
  };
};

export default Home;
