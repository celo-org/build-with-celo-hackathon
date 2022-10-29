import { Button, Form } from 'react-bootstrap';
import { PropsWithChildren, useState } from 'react';
import { useCelo } from '@celo/react-celo';
import { useRouter } from 'next/router';
import { Route } from '../../shared/routes';

type Props = PropsWithChildren<{ projectId: string }>;

export const Calculator = ({ projectId }: Props) => {
  const router = useRouter();
  const { address, account } = useCelo();
  const [userBudget, setUserBudget] = useState(0);

  const handleSubmit = () => {
    if (userBudget) {
      router.push(Route.claimReward({ projectId }));
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        return false;
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your budget for this offset </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          min="1"
          onInput={(e) => setUserBudget(parseInt(e.currentTarget.value))}
        />
        <Form.Text className="text-muted">
          We&apos;ll route this directly to the project.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" className="w-100" type="submit">
        Offset
      </Button>
    </Form>
  );
};
