import Link from 'next/link';
import { PropsWithChildren } from 'react';
import {
  Button,
  Col,
  Form,
  Image,
  Row,
  Card,
  ListGroup,
} from 'react-bootstrap';
import { Project } from '../../../backend/market/market.entity';
import { getProjectUrlByRegistry } from '../../../backend/registry/registry.repo';
import { Calculator } from './Calculator';

type Props = PropsWithChildren<{
  project: Project;
}>;

export const OffsetProject = ({ project }: Props) => {
  return (
    <>
      <h1>{project.projectId}</h1>
      <Row>
        <Col md="4">
          <Link
            passHref
            href={getProjectUrlByRegistry(project.projectId, project.standard)}
          >
            <a>
              <Image
                alt=""
                rounded
                width={'100%'}
                src={`https://via.placeholder.com/200?text="Project ID: ${project.projectId}"`}
              />
            </a>
          </Link>
        </Col>
        <Col md="4">
          <Card className="mb-5">
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <strong>Project</strong>
              </ListGroup.Item>
              <ListGroup.Item>Region: {project.region}</ListGroup.Item>
              <ListGroup.Item>Standard: {project.standard}</ListGroup.Item>
              <ListGroup.Item>
                Methodology: {project.methodology}
              </ListGroup.Item>
              <ListGroup.Item>
                Created:
                {` ${new Date(
                  parseInt(project.timestamp) * 1000
                ).toUTCString()}`}
              </ListGroup.Item>
            </ListGroup>

            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <strong>Tokens</strong>
              </ListGroup.Item>
            </ListGroup>

            {project.vintages?.map((vintage, index) => {
              return (
                <ListGroup className="list-group-flush" key={index}>
                  <ListGroup.Item>
                    Name: {vintage.tco2Token.name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Symbol: {vintage.tco2Token.symbol}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Address: {vintage.tco2Token.address}
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </Card>
        </Col>
        <Col md="4">
          <Calculator projectId={project.projectId} />
        </Col>
      </Row>
    </>
  );
};
