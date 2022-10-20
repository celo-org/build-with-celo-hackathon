import { Container, Navbar } from 'react-bootstrap';

export const TopBar = () => (
  <Navbar bg="dark" variant="dark" sticky="top">
    <Container>
      <Navbar.Brand href="/">Koral Earth</Navbar.Brand>
    </Container>
  </Navbar>
);
