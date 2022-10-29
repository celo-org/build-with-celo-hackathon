import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useCelo } from '@celo/react-celo';

export const TopBar = () => {
  const { account, connect } = useCelo();

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Koral Earth</Navbar.Brand>
        <Nav className="justify-content-end">
          {account && (
            <Badge bg="light" text="dark">
              Connected Account: {account}
            </Badge>
          )}
          {!account && (
            <Button onClick={() => connect().catch(console.log)}>
              Connect
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
