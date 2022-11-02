import { useCelo } from '@celo/react-celo';
import { Alert, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import type { AbiItem } from 'web3-utils';
import Colony from '../../../contracts/Colony.json';
import { Colony as IColony } from '../../../../typechain/contracts/colony/Colony';
import { useQuery } from '@tanstack/react-query';
import { Reward } from '../../../backend/reward/reward.entity';
import { rowsFromData } from '../../lib/array';
import {
  PaginatedItemsComponent,
  PaginatedLayout,
} from '../../core/paginator/PaginatedLayout';

const Rewards: PaginatedItemsComponent<Reward> = ({ currentItems }) => {
  if (!currentItems.length) {
    return <h4>No rewards found.</h4>;
  }

  return (
    <>
      {rowsFromData(currentItems).map((rewards, index) => (
        <Row key={index}>
          {rewards.map((reward, index) => (
            <Col className="md-3 mb-5" key={index}>
              <ListGroup key={index}>
                <ListGroup.Item>Name: {reward.name}</ListGroup.Item>
                <ListGroup.Item>Location: {reward.location}</ListGroup.Item>
              </ListGroup>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export const UserRewards = () => {
  const { kit, account, connect } = useCelo();
  const { error: userRewardsFetchingError, data: userRewards } = useQuery<
    Reward[] | null
  >(['userRewards'], async () => {
    if (!account) {
      return null;
    }

    try {
      const colony = new kit.connection.web3.eth.Contract(
        Colony.abi as AbiItem[],
        Colony.address
      ) as unknown as IColony;

      const claimed = await colony.methods.claimed().call();

      const rewards = await Promise.all(
        claimed.map(async (rewardId, index) => {
          const reward = await colony.methods._rewards(rewardId).call();

          return {
            id: `${index}`,
            name: reward.name,
            location: reward.location,
          };
        })
      );

      return rewards;
    } catch (error) {
      return [];
    }
  });

  if (!account) {
    return (
      <Alert variant="danger">
        Celo provider not initialized.{' '}
        <Alert.Link onClick={() => connect().catch(console.log)}>
          Connect
        </Alert.Link>
      </Alert>
    );
  }

  if (userRewardsFetchingError) {
    return (
      <Alert variant="danger">
        {(userRewardsFetchingError as Error).message}
      </Alert>
    );
  }

  if (userRewards === null && !userRewardsFetchingError) {
    return <Spinner animation="grow" />;
  }

  return (
    <>
      <h3 className="mb-4">My Rewards</h3>
      <hr />
      {userRewards && (
        <PaginatedLayout
          items={userRewards.map((reward, index) => ({
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
