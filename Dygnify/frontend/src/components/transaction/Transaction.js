import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { TextField, Typography, Button } from "@mui/material";
import "./Transaction.css";
import {
  stake,
  unstake,
  withdrawYield,
  getTotalYield,
  getWalletBal,
  getWithdrawBal,
} from "./TransactionHelper";
import { ethers } from "ethers";

const Transaction = () => {
  const [values, setValues] = useState({
    deposit: "",
    withdraw: "",
    yieldWithdraw: "",
  });

  const { deposit, withdraw, yieldWithdraw } = values;

  const [totalYield, setTotalYield] = useState();
  const [withdrawlBal, setWithdrawlBal] = useState();
  const [walletBalance, setWalletBalance] = useState();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    getWalletBal()
      .then((data) => {
        setWalletBalance(data);
      })
      .catch(() => {
        console.log("Error in getting wallet balance");
      });
  }, [walletBalance, withdrawlBal, totalYield]);

  useEffect(() => {
    getWithdrawBal()
      .then((data) => {
        setWithdrawlBal(data);
      })
      .catch(() => {
        console.log("Error in getting withdrawl balance");
      });
  }, [withdrawlBal, walletBalance, totalYield]);

  useEffect(() => {
    getTotalYield()
      .then((data) => {
        setTotalYield(data);
      })
      .catch(() => {
        console.log("Error in getting total yield");
      });
  }, [totalYield, walletBalance, withdrawlBal]);

  const onSubmitStake = (event) => {
    event.preventDefault();
    setValues({ ...values, deposit: "" });
    const amount = ethers.utils.parseEther(values.deposit);
    console.log("AMOUNT: " + amount);
    stake(amount)
      .then(() => {
        setWalletBalance(walletBalance - values.deposit);
        // setWithdrawlBal(withdrawlBal + amount);
      })
      .catch(() => {
        console.log("Can't deposit");
      });
  };

  const onSubmitUnstake = (event) => {
    event.preventDefault();
    // console.log(values.withdraw);
    setValues({ ...values, withdraw: "" });
    const amount = ethers.utils.parseEther(values.withdraw);
    unstake(amount)
      .then(() => {
        setWithdrawlBal(withdrawlBal - values.withdraw);
      })
      .catch(() => {
        console.log("Can't withdraw");
      });
  };

  const onSubmitYield = (event) => {
    event.preventDefault();
    // console.log(yieldWithdraw);
    setValues({ ...values, yieldWithdraw: "" });
    withdrawYield()
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(() => {
        console.log("Can't withdraw yield");
      });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mx: "auto",
          my: "10px",
          width: 1000,
          height: 300,
          py: "10px",
          px: "30px",
        }}
      >
        <div className="grid">
          <Typography variant="h6" display="inline">
            Deposit
          </Typography>
          <Typography variant="h6" display="inline">
            Withdraw
          </Typography>
          <Typography variant="h6" display="inline">
            Total Deposit
          </Typography>
        </div>
        <hr />
        <div className="grid">
          <Typography variant="body1" display="inline">
            Wallet:{walletBalance}
          </Typography>
          <Typography variant="body1" display="inline">
            Balance:{withdrawlBal}
          </Typography>
          <Typography variant="body1" display="inline">
            Total Yield:{totalYield}
          </Typography>
        </div>
        <div className="grid">
          <TextField
            label="Amount"
            variant="outlined"
            margin="normal"
            value={deposit}
            onChange={handleChange("deposit")}
          />
          <TextField
            label="Amount"
            variant="outlined"
            margin="normal"
            value={withdraw}
            onChange={handleChange("withdraw")}
          />
          <TextField
            label="Amount"
            variant="outlined"
            margin="normal"
            value={yieldWithdraw}
            onChange={handleChange("yieldWithdraw")}
          />
        </div>
        <div className="grid">
          <Button variant="contained" onClick={onSubmitStake}>
            Deposit
          </Button>
          <Button variant="contained" onClick={onSubmitUnstake}>
            Withdraw
          </Button>
          <Button variant="contained" onClick={onSubmitYield}>
            Withdraw
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Transaction;
