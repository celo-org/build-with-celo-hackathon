import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useCelo } from '@celo/react-celo';

export const TopBar = () => {
  const { account, connect } = useCelo();

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Koral Earth</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/user-rewards">My Rewards</Nav.Link>

          {!account && (
            <Button onClick={() => connect().catch(console.log)}>
              Connect
            </Button>
          )}
          {account && (
            <Navbar.Text>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Popover color="dark" id="overlay-account" className="p-3">
                    {account}
                  </Popover>
                }
              >
                <Badge bg="light" text="dark">
                  Connected &#10003;
                </Badge>
              </OverlayTrigger>
            </Navbar.Text>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
