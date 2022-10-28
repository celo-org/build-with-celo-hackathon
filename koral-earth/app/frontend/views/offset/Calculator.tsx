import { Button, Form } from 'react-bootstrap';
export const Calculator = () => (
  <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Enter your budget for this offset </Form.Label>
      <Form.Control type="number" placeholder="Enter amount" min="1" />
      <Form.Text className="text-muted">
        We&apos;ll route this directly to the project.
      </Form.Text>
    </Form.Group>
    <Button variant="primary" className="w-100" type="submit">
      Offset
    </Button>
  </Form>
);
