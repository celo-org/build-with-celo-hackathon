import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useContractKit } from "@celo-tools/use-contractkit";
import Wallet from "./components/Wallet";
import { useBalance, useContract } from "./hooks";
import "./App.css";
import Main from "./Main";
import Home from "./Home";

const App = function AppWrapper() {
  const { address, destroy, connect, performActions } = useContractKit();
  const { balance } = useBalance();
  const contract = useContract();


  return (
    <>
      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <Main contract={contract} performActions={performActions} />
        </Container>
      ) : (
        <Home connect={connect} />
      )}
    </>
  );
};

export default App;
