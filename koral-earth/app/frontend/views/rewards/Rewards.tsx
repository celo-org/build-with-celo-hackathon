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
import type { Colony } from '../../../../typechain/contracts/colony/Colony';
import { useQuery } from '@tanstack/react-query';
import { ClaimReward } from './ClaimReward';
import { Network } from '../../../common/blockchain';
import { ColonyContract } from '../../../contracts/colony';

const network = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK as Network;
const colonyContract = ColonyContract[network];

type ProjectReward = Reward & { projectId: string };

const Rewards: PaginatedItemsComponent<ProjectReward> = ({ currentItems }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rewardToBeClaimed, setRewardToBeClaimed] = useState<
    ProjectReward | undefined
  >(undefined);

  const onClaimReward = (reward: ProjectReward) => {
    setRewardToBeClaimed(reward);
    setShowModal(true);
  };

  if (!currentItems.length) {
    return <h4>No rewards found.</h4>;
  }

  return (
    <>
      {rowsFromData(currentItems).map((rewards, index) => (
        <Row key={index}>
          {rewards.map((reward, index) => (
            <Col className="md-3" key={index}>
              <ListGroup key={index}>
                <ListGroup.Item>Name: {reward.name}</ListGroup.Item>
                <ListGroup.Item>Location: {reward.location}</ListGroup.Item>
                <Button className="mt-3" onClick={() => onClaimReward(reward)}>
                  Claim Reward
                </Button>
              </ListGroup>
            </Col>
          ))}
        </Row>
      ))}
      {showModal && rewardToBeClaimed && (
        <ClaimReward
          reward={rewardToBeClaimed}
          projectId={rewardToBeClaimed.projectId}
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
  const { error: rewardsFetchingError, data: rewards } = useQuery<
    Reward[] | null
  >(['colonyRewards'], async () => {
    if (!account) {
      return null;
    }

    const colony = new kit.connection.web3.eth.Contract(
      colonyContract.abi as AbiItem[],
      colonyContract.address
    ) as unknown as Colony;

    const rewards = await colony.methods.rewards().call();

    return rewards.map((reward, index) => ({
      id: `${index}`,
      name: reward[0],
      location: reward[1],
    }));
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

  if (rewardsFetchingError) {
    return (
      <Alert variant="danger">{(rewardsFetchingError as Error).message}</Alert>
    );
  }

  if (rewards === null && !rewardsFetchingError) {
    return <Spinner animation="grow" />;
  }

  return (
    <>
      <h3 className="mb-4">Rewards for project: {projectId} </h3>
      <hr />
      {rewards && (
        <PaginatedLayout
          items={rewards.map((reward, index) => ({
            ...reward,
            id: `${index}`,
            projectId,
          }))}
          itemsPerPage={12}
          itemsComponent={Rewards}
        />
      )}
    </>
  );
};
