import { Alert, Button, Form } from 'react-bootstrap';
import { PropsWithChildren, useState } from 'react';
import { useRouter } from 'next/router';
import { Route } from '../../shared/routes';

type Props = PropsWithChildren<{ projectId: string }>;

export const Calculator = ({ projectId }: Props) => {
  const router = useRouter();
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
        <Form.Label>Enter your budget for this offset (in USD) </Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter amount"
          min="10"
          onInput={(e) => setUserBudget(parseInt(e.currentTarget.value))}
        />
        <Form.Text className="text-muted">
          We&apos;ll route this directly to the project.
        </Form.Text>
      </Form.Group>
      <Alert variant="dark">
        <i>
          You can only earn rewards when you have a minimum budget of $10 for
          offsetting with this project.
          <br />
          <strong>NB:</strong> If you don&apos;t have a sufficient budget but
          still intend to offset, please go ahead. Your money will not be lost.
          It will be pooled for you as a token equivalent. In the future, we
          will support NFTs. You can always come back to offset more with a
          different budget.
        </i>
      </Alert>
      <Button variant="primary" className="w-100" type="submit">
        Offset
      </Button>
    </Form>
  );
};
