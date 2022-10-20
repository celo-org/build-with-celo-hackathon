import type { GetStaticPropsResult, NextPage, NextPageContext } from 'next';
import { Project } from '../backend/shared/models/market';
import { Market } from '../frontend/views/market/Market';
import toucanProjects from '../backend/shared/data/toucanProjects.json';
import { rowsFromData } from '../frontend/lib/array';

type Props = {
  projects: Project[];
};

const Home: NextPage<Props> = ({ projects }) => <Market projects={projects} />;

export const getStaticProps = async (
  _context: NextPageContext
): Promise<GetStaticPropsResult<Props>> => {
  const { projects } = toucanProjects.data;

  return {
    props: { projects },
  };
};

export default Home;
