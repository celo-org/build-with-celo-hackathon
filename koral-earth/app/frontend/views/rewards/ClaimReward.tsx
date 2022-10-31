import { useCelo } from '@celo/react-celo';
import { useMutation } from '@tanstack/react-query';
import type { AbiItem } from 'web3-utils';
import { FC, useEffect } from 'react';
import Colony from '../../../contracts/Colony.json';
import { Colony as IColony } from '../../../../typechain/contracts/colony/Colony';
import { Modal, Spinner, Button, Badge, Alert } from 'react-bootstrap';

type Props = {
  rewardId: number;
  onCloseModal: () => void;
};

export const ClaimReward: FC<Props> = ({ rewardId, onCloseModal }) => {
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
      Colony.abi as AbiItem[],
      Colony.address
    ) as unknown as IColony;

    const claim = await colony.methods.claimReward(rewardId).send({
      from: account,
    });

    return claim.status;
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const closeModal = () => {
    if (!isLoading) {
      onCloseModal();
    }
  };

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Claiming Reward...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <p>
            Connected account:{' '}
            <Badge bg="dark" text="light">
              {account}
            </Badge>
          </p>
          {isLoading && (
            <>
              <h6>
                Hang tight! We&apos;re claiming the reward for you using your
                connected account...
              </h6>
              <Spinner animation="border" color="info" />
            </>
          )}
          {rewardClaimingError && (
            <>
              <h6>We failed to claim the reward for you.</h6>
              <Alert variant="danger">
                {(rewardClaimingError as Error).message}
              </Alert>
            </>
          )}
          {claimed && (
            <>
              <h6>Reward claimed successfully using the connected account!</h6>
            </>
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
