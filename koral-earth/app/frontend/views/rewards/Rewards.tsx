import { useCelo } from '@celo/react-celo';
import type { AbiItem } from 'web3-utils';
import { PropsWithChildren, useState } from 'react';
import { Alert, Button, Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { Reward } from '../../../backend/reward/reward.entity';
import { rowsFromData } from '../../lib/array';
import {
  PaginatedItemsComponent,
  PaginatedLayout,
} from '../../core/paginator/PaginatedLayout';
import Colony from '../../../contracts/Colony.json';
import { Colony as IColony } from '../../../../typechain/contracts/colony/Colony';
import { useQuery } from '@tanstack/react-query';
import { ClaimReward } from './ClaimReward';

const Rewards: PaginatedItemsComponent<Reward> = ({ currentItems }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rewardToBeClaimed, setRewardToBeClaimed] = useState<number>(-1);

  const onClaimReward = (rewardId: number) => {
    setRewardToBeClaimed(rewardId);
    setShowModal(true);
  };

  return (
    <>
      {rowsFromData(currentItems).map((rewards, index) => (
        <Row key={index}>
          {rewards.map((reward, index) => (
            <Col className="md-3" key={index}>
              <ListGroup key={index}>
                <ListGroup.Item>Name: {reward.name}</ListGroup.Item>
                <ListGroup.Item>Location: {reward.location}</ListGroup.Item>
                <Button className="mt-3" onClick={() => onClaimReward(index)}>
                  Claim Reward
                </Button>
              </ListGroup>
            </Col>
          ))}
        </Row>
      ))}
      {showModal && (
        <ClaimReward
          rewardId={rewardToBeClaimed}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

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
