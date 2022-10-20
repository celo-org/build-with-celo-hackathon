import type { GetStaticPropsResult, NextPage, NextPageContext } from 'next';
import { Project } from '../backend/shared/models/market';
import { Market } from '../frontend/views/market/Market';
import toucanProjects from '../backend/shared/data/toucanProjects.json';

type Props = {
  projects: Project[];
  projectsInRows: Project[][];
};

const Home: NextPage<Props> = ({ projects, projectsInRows }) => (
  <Market projects={projects} projectsInRows={projectsInRows} />
);

export const getStaticProps = async (
  context: NextPageContext
): Promise<GetStaticPropsResult<Props>> => {
  const { projects } = toucanProjects.data;
  const projectsGroupedInRows: Project[][] = [];
  const ungroupedLastRow = (projects as Project[]).reduce(
    (prev: Project[], curr: Project, index) => {
      if (index % 4 === 0) {
        projectsGroupedInRows.push(prev);
        return [curr];
      }
      return [...prev, curr];
    },
    []
  );
  projectsGroupedInRows.push(ungroupedLastRow);

  return {
    props: { projectsInRows: projectsGroupedInRows, projects },
  };
};

export default Home;
