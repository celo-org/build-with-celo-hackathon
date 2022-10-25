import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useCelo } from '@celo/react-celo';

export const TopBar = () => {
  const { connect, address } = useCelo();

  const onConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.log('Connection error occurred', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Koral Earth</Navbar.Brand>
        <Nav className="justify-content-end">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {address ? address : <Button onClick={onConnect}>Connect</Button>}
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};
