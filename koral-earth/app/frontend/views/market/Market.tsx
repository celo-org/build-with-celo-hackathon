import { PropsWithChildren } from 'react';
import { Button, Card, Row, Col, ListGroup } from 'react-bootstrap';
import { Project, TCO2Token } from '../../../backend/market/market.entity';
import classNames from 'classnames';
import {
  PaginatedItemsComponent,
  PaginatedLayout,
} from '../../core/paginator/PaginatedLayout';
import { rowsFromData } from '../../lib/array';
import Link from 'next/link';
import { getProjectUrlByRegistry } from '../../../backend/registry/registry.repo';

const Projects: PaginatedItemsComponent<TCO2Token> = ({ currentItems }) => (
  <>
    {rowsFromData(currentItems).map((eachRow, rowIndex) => (
      <Row key={rowIndex}>
        {eachRow.map(({ projectVintage: { project } }, index) => {
          if (!project.projectId || !project.standard) {
            return null;
          }

          const decomposedProjectId = project.projectId.split('-');

          return (
            <Col
              md="3"
              key={index}
              className={classNames('mb-3', { 'pr-3': rowIndex + 1 !== index })}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://via.placeholder.com/200?text="Project ID: ${project.methodology}"`}
                />
                <Card.Body>
                  <Card.Title>
                    Project ID:
                    <Link
                      passHref
                      href={getProjectUrlByRegistry(
                        project.standard,
                        decomposedProjectId[1]
                      )}
                    >
                      <a>{project.projectId}</a>
                    </Link>
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Region: {project.region}</ListGroup.Item>
                  <ListGroup.Item>
                    Methodology: {project.methodology}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
              <Row className="m-2">
                <Button variant="primary">Offset through project</Button>
              </Row>
            </Col>
          );
        })}
      </Row>
    ))}
  </>
);

type MarketProps = PropsWithChildren<{
  tco2Tokens: TCO2Token[];
}>;

export const Market = ({ tco2Tokens }: MarketProps) => {
  return (
    <>
      <h3 className="mb-4">Toucan Carbon Credit Projects</h3>
      <PaginatedLayout
        items={tco2Tokens}
        itemsPerPage={12}
        itemsComponent={Projects}
      />
    </>
  );
};
