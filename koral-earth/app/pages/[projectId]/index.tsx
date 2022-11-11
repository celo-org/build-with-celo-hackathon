import type { GetStaticPropsResult, NextPage, NextPageContext } from 'next';
import type { Project } from '../../backend/market/market.entity';
import { OffsetProject } from '../../frontend/views/offset/OffsetProject';
import { getProjects, getProject } from '../../backend/market/market.repo';

type Props = {
  project: Project | null;
};

const OffsetProjectPage: NextPage<Props> = ({ project }) => {
  if (!project) {
    return <h1>Project not found</h1>;
  }
  return <OffsetProject project={project} />;
};

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

  const project = await getProject(projectId);

  return {
    props: { project },
  };
}

export default OffsetProjectPage;
