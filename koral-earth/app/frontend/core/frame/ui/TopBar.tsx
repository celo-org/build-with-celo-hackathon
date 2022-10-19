import { FC, PropsWithChildren } from 'react';
import { Container, Navbar } from 'react-bootstrap';

type Props = PropsWithChildren<{}>;

export const TopBar: FC<Props> = () => (
  <Navbar bg="dark" variant="dark" sticky="top">
    <Container>
      <Navbar.Brand href="/">Koral Earth</Navbar.Brand>
    </Container>
  </Navbar>
);
