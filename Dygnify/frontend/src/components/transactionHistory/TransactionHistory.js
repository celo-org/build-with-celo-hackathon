import React from "react";
import { Typography, Container } from "@material-ui/core";
import "./TransactionHistory.css";
import { getDate } from "./TransactionHelper";
import { getTransactionHistory } from "./TransactionGetter";

const TransactionHistory = () => {
  console.log(getTransactionHistory());
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Transaction History
        </Typography>
        <div className="flex">
          <Typography display="inline">Date</Typography>
          <Typography display="inline">Change</Typography>
          <Typography display="inline">Txn Hash</Typography>
        </div>
        <hr />
        <div className="flex-date">
          <Typography display="inline">{getDate(Date.now())}</Typography>
          <Typography display="inline">110</Typography>
          <Typography display="inline">0xlkajdkajdkjaskdjk</Typography>
        </div>
      </Container>
    </>
  );
};

export default TransactionHistory;
