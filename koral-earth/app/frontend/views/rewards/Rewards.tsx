import { PropsWithChildren } from 'react';
import { Reward } from '../../../backend/reward/reward.entity';
import { rowsFromData } from '../../lib/array';
import {
  PaginatedItemsComponent,
  PaginatedLayout,
} from '../../core/paginator/PaginatedLayout';
import { Alert, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useCelo } from '@celo/react-celo';
import type { AbiItem } from 'web3-utils';
import Colony from '../../../contracts/Colony.json';
import { Colony as IColony } from '../../../../typechain/contracts/colony/Colony';
import { useQuery } from '@tanstack/react-query';

const Rewards: PaginatedItemsComponent<Reward> = ({ currentItems }) => (
  <>
    {rowsFromData(currentItems).map((rewards, index) => (
      <Row key={index}>
        {rewards.map((reward, index) => (
          <Col className="md-3" key={index}>
            <ListGroup className="list-group-flush" key={index}>
              <ListGroup.Item>Name: {reward.name}</ListGroup.Item>
              <ListGroup.Item>Location: {reward.location}</ListGroup.Item>
            </ListGroup>
          </Col>
        ))}
      </Row>
    ))}
  </>
);

type RewardsProps = PropsWithChildren & {
  projectId: string;
};

export const ProjectRewards = ({ projectId }: RewardsProps) => {
  const { kit, account, connect } = useCelo();
  const {
    isLoading,
    error: rewardsFetchingError,
    data: rewards,
  } = useQuery<Reward[] | null>(['colony-rewards'], async () => {
    if (!account) {
      return null;
    }

    const colony = new kit.connection.web3.eth.Contract(
      Colony.abi as AbiItem[],
      Colony.address
    ) as unknown as IColony;

    const rewards = await colony.methods.rewards().call();

    return rewards.map((reward, index) => ({
      id: `${index}`,
      name: reward[0],
      location: reward[1],
    }));
  });

  return (
    <>
      <h3 className="mb-4">Rewards for project: {projectId} </h3>
      {isLoading && account && <Spinner animation="grow" />}
      {!account && (
        <Alert variant="danger">
          Celo provider not initialized.{' '}
          <Alert.Link onClick={() => connect().catch(console.log)}>
            Connect
          </Alert.Link>
        </Alert>
      )}
      {rewardsFetchingError && (
        <Alert variant="danger">
          {(rewardsFetchingError as Error).message}
        </Alert>
      )}
      {rewards && (
        <PaginatedLayout
          items={rewards.map((reward, index) => ({
            ...reward,
            id: `${index}`,
          }))}
          itemsPerPage={12}
          itemsComponent={Rewards}
        />
      )}
    </>
  );
};
