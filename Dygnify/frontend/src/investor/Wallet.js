import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, TextField, Card } from "@mui/material";
import BorrowChart from "../components/charts/BorrowChart";
import StakeChart from "../components/charts/StakeChart";
import { requestAccount } from "../components/navbar/NavBarHelper";
import {
  approve,
  stake,
  unstake,
  withdrawYield,
  getTotalYield,
  getWalletBal,
  getWithdrawBal,
  allowance
} from "../components/transaction/TransactionHelper";
import { ethers } from "ethers";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';
import PulseLoader from "react-spinners/PulseLoader";

const getEthAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
  return await signer.getAddress();
};

const Wallet = () => {
  const errorNotify = (error) => toast.error(error);
  const [values, setValues] = useState({
    deposit: "",
    withdraw: "",
    yieldWithdraw: "",
  });

  const [approveloading, setApproveLoading] = useState(false);
  const [depositeloading, setDepositeLoading] = useState(false);
  const [withdrawloading, setWithdrawLoading] = useState(false);

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
        setWalletBalance(Number(data).toFixed(2));
      })
      .catch(() => {
        console.log("Error in getting wallet balance");
      });
  }, [walletBalance, withdrawlBal, totalYield]);

  useEffect(() => {
    getTotalYield()
      .then((data) => {
        setTotalYield(Number(data).toFixed(2));
      })
      .catch(() => {
        console.log("Error in getting total yield");
      });
  }, [totalYield, walletBalance, withdrawlBal]);

  const onSubmitApprove = (event) => {
    setApproveLoading(true)
    event.preventDefault();
    // if(parseInt( values.deposit) >  Number(walletBalance)){
    //   errorNotify("Please enter an amount not exceeding the wallet balance");
    //   setApproveLoading(false)
    // }
    // else{
      setValues({ ...values, deposit: "" });
      const amount = ethers.utils.parseEther(values.deposit);
      console.log("AMOUNT: " + amount);
      approve(amount)
        .then(() => {
          setApproveLoading(false) 
        })
        .catch(() => {
          errorNotify("Approval failed. Please try again.");
          setApproveLoading(false)
        });
    //}
    
  };

  const onSubmitStake = async(event) => {
    setDepositeLoading(true)
    let address = await getEthAddress();
    console.log(address)
    allowance(address).then(
      re=>{
        console.log(Number(re), parseInt( values.deposit))
        if(Number(re)<parseInt( values.deposit)){
          errorNotify("Please approve the amount before depositing");
          setDepositeLoading(false)
        }
        // else if(parseInt( values.deposit) >  Number(walletBalance)){
        //   errorNotify("Please enter an amount not exceeding the wallet balance");
        //   setDepositeLoading(false)
        // }
        else{
          event.preventDefault();
          setValues({ ...values, deposit: "" });
          const amount = ethers.utils.parseEther(values.deposit);
          console.log("AMOUNT: " + amount);
          stake(amount)
            .then(() => {
              let temp = walletBalance - values.deposit
              setWalletBalance(temp.toFixed(2));
              setDepositeLoading(false)
              // setWithdrawlBal(withdrawlBal + amount);
            })
            .catch(() => {
              errorNotify("Deposit failed. Please try again.");
              setDepositeLoading(false)
            });
        }    
      }
    );
    
  };

  const onSubmitUnstake = (event) => {
    setWithdrawLoading(true)
    if( parseInt(values.withdraw) >  Number(withdrawlBal) ){
      errorNotify("Please enter an amount not exceeding the staking balance");
      setWithdrawLoading(false)
    }
    else{
      event.preventDefault();
      // console.log(values.withdraw);
      setValues({ ...values, withdraw: "" });
      const amount = ethers.utils.parseEther(values.withdraw);
      unstake(amount)
        .then(() => {
          let temp = withdrawlBal - values.withdraw
          setWithdrawlBal(temp.toFixed(2));
          setWithdrawLoading(false)
        })
        .catch(() => {
          errorNotify("Withdrawal failed. Please try again.");
          setWithdrawLoading(false)
        });
    }  
  };

  const onSubmitYield = (event) => {
    event.preventDefault();
    // console.log(yieldWithdraw);
    setValues({ ...values, yieldWithdraw: "" });
    withdrawYield()
      .then(() => {
        setTotalYield(0);
      })
      .catch(() => {
        errorNotify("Can't withdraw yield");
      });
  };
  
  return (
    <>
      <style>{"body { background-color: #7165e3 }"}</style>
      
      <Box
        sx={{
          height: "90px",
          backgroundColor: "#ffffff",
          borderEndEndRadius: "12px",
          borderEndStartRadius: "12px",
          px: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <img
            style={{ width: "150px", height: "80px", objectFit: "contain" }}
            src="./assets/logo.png"
            alt="company logo"
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            textAlign: "center",
          }}
        >
          <div>
            <Typography variant="body2">Switch to</Typography>
            <Button
              size="small"
              sx={{ backgroundColor: "#E5E5E5", borderRadius: "120px" }}
            >
              {process.env.REACT_APP_TOKEN_NAME}
            </Button>
          </div>
          <Button
            sx={{ backgroundColor: "#7165E3" }}
            variant="contained"
            size="large"
            onClick={requestAccount}
          >
            Connect Wallet
          </Button>
        </div>
      </Box>
      <Stack sx={{ color: "#ffffff", ml: "64px", mt: "28px" }}>
      </Stack>
      <Stack
          sx={{
            color: "#ffffff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "185px"
          }}
        >
          <Box>
        <Card
          sx={{
            mb: "5px",
            maxWidth: 100,
            py: "2px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            textAlign: "justify",
            borderRadius: "12px",
          }}
        >
          <img
            style={{ width: "88px", height: "77px" }}
            src="./assets/supply-chain.png"
            alt=""
          />
          </Card>
          </Box>
          <Typography ml={2}>Supply Chain Finance</Typography>
        </Stack>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          mx: "auto",
          mt: "22px",
          py: "16px",
          px: "16px",
          maxWidth: "900px",
          borderRadius: "12px",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" m={2} sx={{ color: "#5B4ED4" }}>
          Opportunity Statistics
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Stack>
            <Typography variant="h6">Total Liquidity </Typography>
            <BorrowChart />
          </Stack>
          <Stack>
            <Typography variant="h6">Total Borrowing</Typography>
            <StakeChart />
          </Stack>
        </Stack>
      </Box>
      <Box
        
        sx={{
          backgroundColor: "#ffffff",
          mx: "auto",
          mt: "22px",
          py: "16px",
          px: "16px",
          width: "900px",
          borderRadius: "12px",
        }}
      >  
        <Typography variant="h6" m={2} sx={{ textAlign:"center",color: "#5B4ED4" }}>
          Investor Statistics
        </Typography>
        <Stack
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0px 10px",
            mx: "110px",
          }}
        >
          <Typography variant="subtitle1">Deposit</Typography>
          <Typography variant="subtitle1" style={{marginLeft:"273px"}}>Withdraw</Typography>
          {/* <Typography variant="subtitle1">Withdraw Yield </Typography> */}
        </Stack>
        <Stack
          sx={{
            // display: "flex",
            // gridTemplateColumns: "1fr 1fr 1fr",
            // gap: "0px 10px",
            // mx: "32px",
          }}
        >
          <div style ={{display:"flex"}} >
            <Typography sx={{ color: "#979797", marginLeft:"110px" }} variant="">
            Wallet :{walletBalance}
          </Typography>
          <div style={{display:"flex", flexDirection:"column", marginLeft:"343px" }}><Typography sx={{ color: "#979797" }} variant="">
            Balance :{withdrawlBal}
          </Typography>
          <Typography sx={{ color: "#979797" }} variant="">
            Total Yield :{totalYield}
          </Typography></div>
          </div>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            label="Amount"
            variant="outlined"
            margin="normal"
            value={deposit}
            onChange={handleChange("deposit")}
            style={{marginLeft:"110px"}}
          />
          <TextField
            label="Amount"
            variant="outlined"
            margin="normal"
            value={withdraw}
            onChange={handleChange("withdraw")}
            style={{marginLeft:"215px"}}
          />
        </Stack>
      </Box>
      <Stack
        sx={{
          mx: "auto",
          mt: "12px",
          mb: "48px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {
          approveloading 
          ?
              <Box 
              sx={{ backgroundColor: "#ffffff", color: "#7165E3" ,marginLeft:"310px",marginRight:"10px"}}
              ><Typography>
              Approving...
              </Typography>
              <PulseLoader size='25px' color='#7165e3' margin='5px'  /></Box>
          :
            <Button
            sx={{ backgroundColor: "#ffffff", color: "#7165E3" ,marginLeft:"310px",marginRight:"10px"}}
            variant="contained"
            size="large"
            onClick={onSubmitApprove}
            >
              Approve
            </Button>
        }
        
        {
          depositeloading
          ?
          <Box 
            sx={{ backgroundColor: "#ffffff", color: "#7165E3" ,marginRight:"35px"}}
            ><Typography>
            Depositing...
            </Typography>
            <PulseLoader size='25px' color='#7165e3' margin='5px'  /></Box>
          :
            <Button
            sx={{ backgroundColor: "#ffffff", color: "#7165E3" ,marginRight:"35px"}}
            variant="contained"
            size="large"
            onClick={onSubmitStake}
            >
              Deposit
            </Button>
        }
        
        {
          withdrawloading
          ?
          <Box 
            sx={{ backgroundColor: "#ffffff", color: "#7165E3" }}
            ><Typography>
            Withdraw...
            </Typography>
            <PulseLoader size='25px' color='#7165e3' margin='5px'  /></Box>
          :
            <Button
            sx={{ backgroundColor: "#ffffff", color: "#7165E3" }}
            variant="contained"
            size="large"
            onClick={onSubmitUnstake}
            style={{marginLeft:"160px"}}
            >
              Withdraw
            </Button>
        }
        
      </Stack>
      <ToastContainer theme="colored" />
    </>
  );
};

export default Wallet;
