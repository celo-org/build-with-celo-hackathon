import { FC, PropsWithChildren } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Project } from '../../../backend/shared/models/market';
import classNames from 'classnames';

type Props = PropsWithChildren<{
  projects: Project[];
  projectsInRows: Project[][];
}>;

export const Market = ({ projectsInRows }: Props) => {
  return (
    <>
      <h3 className="mb-4">Toucan Carbon Credit Projects</h3>
      {projectsInRows.map((eachRow, rowIndex) => (
        <Row key={rowIndex}>
          {eachRow.map((project, index) => (
            <Col
              md="3"
              key={index}
              className={classNames('mb-3', { 'pr-3': rowIndex + 1 !== index })}
            >
              <Card>
                <Card.Img variant="top" src="https://via.placeholder.com/50" />
                <Card.Body>
                  <Card.Title>Project ID: {project.projectId}</Card.Title>
                  <Card.Text>
                    Some quick example text to occupy space for the
                    project&apos;s content.
                  </Card.Text>
                  <Button variant="primary">Donate</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};
