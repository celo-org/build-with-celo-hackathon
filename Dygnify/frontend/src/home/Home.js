import React, { useState, useEffect } from "react";
import Sidebar from "../components/base/Sidebar";
import "./Home.css";
import { Typography, Container } from "@mui/material";
import BorrowChart from "../components/charts/BorrowChart";
import StakeChart from "../components/charts/StakeChart";
import NavBar from "../components/navbar/NavBar";
import TransactionHistory from "../components/transactionHistory/TransactionHistory";
import Transaction from "../components/transaction/Transaction";
// const dygnifyStakingAddress = "0x249666561CCA2C5cDCa9833A0C06f19EA5af5d7d";
// const token = "0x4f7A4C6C4Ec8E5085fF96fd84aa462c757e4c6d8";

const Home = () => {
  const form = () => {
    return (
      <div className="box">
        <Sidebar></Sidebar>
        <aside className="right">
          <NavBar />
          <section className="charts">
            <Container maxWidth="sm">
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Liquidity
              </Typography>
              <StakeChart />
            </Container>
            <Container maxWidth="sm">
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Borrow
              </Typography>
              <BorrowChart />
            </Container>
          </section>

          <Transaction></Transaction>
          <TransactionHistory />
        </aside>
      </div>
    );
  };

  return <>{form()}</>;
};

export default Home;
