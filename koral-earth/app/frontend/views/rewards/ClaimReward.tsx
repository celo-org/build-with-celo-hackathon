import { useCelo } from '@celo/react-celo';
import { useMutation } from '@tanstack/react-query';
import type { AbiItem } from 'web3-utils';
import { FC } from 'react';
import type { Colony } from '../../../typechain/contracts/colony/Colony';
import { Modal, Spinner, Button, Badge, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Route } from '../../shared/routes';
import { Reward } from '../../../backend/reward/reward.entity';
import { Network } from '../../../common/blockchain';
import { ColonyContract } from '../../../contracts/colony';

const network = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK as Network;
const colonyContract = ColonyContract[network];

type Props = {
  projectId: string;
  reward: Reward;
  onCloseModal: () => void;
};

export const ClaimReward: FC<Props> = ({ projectId, reward, onCloseModal }) => {
  const router = useRouter();
  const { kit, account, connect } = useCelo();

  const {
    isLoading,
    error: rewardClaimingError,
    data: claimed,
    mutate,
  } = useMutation<boolean | null>(async () => {
    if (!account) {
      await connect().catch(console.log);
      return null;
    }

    const colony = new kit.connection.web3.eth.Contract(
      colonyContract.abi as AbiItem[],
      colonyContract.address
    ) as unknown as Colony;

    const claim = await colony.methods.claimReward(reward.id, projectId).send({
      from: account,
    });

    return claim.status;
  });

  const closeModal = () => {
    if (!isLoading) {
      onCloseModal();
    }
  };

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Claim Reward: {reward.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <p>
            Connected account:{' '}
            <Badge bg="dark" text="light">
              {account}
            </Badge>
            <br />
            <small>
              <i>We will assign this reward to this account.</i>
            </small>
          </p>
          {isLoading && (
            <>
              <Alert variant="info" className="text-center">
                <Spinner animation="border" color="info" />
                <h6>
                  Hang tight! We&apos;re claiming the reward for you using your
                  connected account...
                </h6>
              </Alert>
            </>
          )}
          {rewardClaimingError && (
            <>
              <Alert variant="danger">
                <h6>We failed to claim the reward for you.</h6>
                <span>&#10060; {(rewardClaimingError as Error).message}</span>
              </Alert>
            </>
          )}
          {claimed && (
            <Alert variant="success">
              &#10003; Reward claimed successfully!
            </Alert>
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        {!claimed && !isLoading && (
          <Button variant="primary" onClick={() => mutate()}>
            Claim Reward
          </Button>
        )}
        {claimed && (
          <Button
            variant="primary"
            onClick={() => router.push(Route.userRewards)}
          >
            See claimed rewards
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
