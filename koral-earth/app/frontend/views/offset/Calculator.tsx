import { useCelo } from '@celo/react-celo';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { PropsWithChildren, useState } from 'react';
import type { AbiItem } from 'web3-utils';
import { Contribute } from './Contribute';
import type { Colony } from '../../../typechain/contracts/colony/Colony';
import { ColonyContract } from '../../../contracts/colony';
import { Network } from '../../../common/blockchain';

const network = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK as Network;
const colonyContract = ColonyContract[network];

type Props = PropsWithChildren<{ projectId: string }>;

const WEI_UNIT = Math.pow(10, 18);

export const Calculator = ({ projectId }: Props) => {
  const { kit, account, connect } = useCelo();
  const [userBudget, setUserBudget] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { error: minContributionFetchingError, data: minContribution } =
    useQuery<number | null>(['minContributionPerProject'], async () => {
      if (!account) {
        return null;
      }

      const colony = new kit.connection.web3.eth.Contract(
        colonyContract.abi as AbiItem[],
        colonyContract.address
      ) as unknown as Colony;

      const minContribution = await colony.methods
        .minContributionPerProject(projectId)
        .call();

      return parseInt(minContribution);
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

  const handleSubmit = () => {
    if (userBudget) {
      setShowModal(true);
    }
  };

  if (minContributionFetchingError) {
    return (
      <Alert variant="danger">
        {(minContributionFetchingError as Error).message}
      </Alert>
    );
  }

  if (minContribution === null && !minContributionFetchingError) {
    return <Spinner animation="grow" />;
  }

  if (minContribution === 0 || !minContribution) {
    return (
      <Alert variant="info">
        This project does not support claiming rewards yet
      </Alert>
    );
  }

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          return false;
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your budget for this offset (in CELO) </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            min={'1'}
            onInput={(e) =>
              setUserBudget(parseInt(e.currentTarget.value) * WEI_UNIT)
            }
          />
          <Form.Text className="text-muted">
            We&apos;ll route this contribution directly to the project.
          </Form.Text>
        </Form.Group>
        <Alert variant="dark">
          <i>
            You can only earn rewards after spending{' '}
            {minContribution / WEI_UNIT}
            {' CELO '}
            offsetting with this project.
            <br />
            <strong>NB:</strong> If you don&apos;t have a sufficient budget at
            the moment but still intend to offset, please go ahead. Your money
            will not be lost. It will be stored for you. You can always come
            back to offset more with a different budget.
          </i>
        </Alert>
        <Button variant="primary" className="w-100" type="submit">
          Offset
        </Button>
      </Form>
      {showModal && (
        <Contribute
          projectId={projectId}
          amountToContribute={userBudget}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};
