import React, { useEffect, useState } from "react";
import "./App.css";
import { useMetaMask } from "./hooks/useMetaMask";
import { ethers } from "ethers";
//import hre from 'hardhat';
//import "@nomiclabs/hardhat-ethers";
import { WrapperBuilder } from "redstone-evm-connector";
import MetaMaskOnboarding from '@metamask/onboarding';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Grid } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';

type EthereumAccounts = any[] | undefined | null;
type EthereumBalance = any | undefined | null;

function App() {
  const ethereum = useMetaMask();
  const [account, setAccount] = useState<string | null>(null);
  const [invoice, setInvoice] = useState("");
  const [balance, setBalance] = useState(0);
  const [chainID, setChainID] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [tokenBal, setTokenBal] = useState(0);
  const [service, setService] = useState("Walmart");

  const handleChange = (event:any) => {
   setService(event.target.value);
  }
  const handleAccountsChanged = (args: unknown) => {
    let accounts = args as EthereumAccounts;
    if (Array.isArray(accounts)) {
      setAccount(accounts[0]);
      getBalanceFromAccount(accounts[0]);
      tokenBalance();
    }
  };

  const handleNoMetaMaskInstalled = () => {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
    console.log("install metamask");
  };

  useEffect(() => {
    if (ethereum) {
      setChainID(ethereum.chainId);
      setNetwork(ethereum.networkVersion);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum
        .request({ method: "eth_accounts" })
        .then(handleAccountsChanged)
        .catch(console.error);
    } else {
      handleNoMetaMaskInstalled();
    }
    return () => {
      ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [ethereum]);

  const connect = async () => {
    if (ethereum) {
      setChainID(ethereum.chainId);
      setNetwork(ethereum.networkVersion);
      let accounts: EthereumAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (Array.isArray(accounts)) {
        setAccount(accounts[0]);
        getBalanceFromAccount(accounts[0]);
        addNewToken();
      }
    } else {
      handleNoMetaMaskInstalled();
    }
  };


  const getBalanceFromAccount = async (accountNumber: string) =>{
    
    if (ethereum) {
      let balances : EthereumBalance = await ethereum.request({
        method:'eth_getBalance',
        params:[accountNumber, 'latest']
      })
      setBalance(parseInt(balances,16) / 1e18);
      sessionStorage.setItem('eth_balance', ''+parseInt(balances,16) / 1e18);
    } else {
      handleNoMetaMaskInstalled();
    }
  }

  const handleInvoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice(event.target.value);
  };

  const sendTransaction = async () => {
    if (ethereum && account) {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      /************* FrontFace contract address ************* */
      const contractAddress = "0xa8738d58EF159eC81690dfFF8348eD8ab314BD4B";
      const contractInterface = require("./contracts/frontFaceContractAbi.json");
      const contract = new ethers.Contract(
        contractAddress,
        contractInterface,
        provider
      );
      const contractWithSignature = contract.connect(provider.getSigner());
      // ...
      const response = await contractWithSignature.sendReceipt(
        parseInt(invoice)
      );
      console.log(response);
      tokenBalance();
  };
}
  /******************** */
 /********* */
const addNewToken = async () => {
/************* SUST ERC20 contract address ************* */
 const tokenAddress = '0x720f4894B95698CD948D2774c0EfE45632397F8C';
 const tokenSymbol = 'SUST';
 const tokenDecimals = 18;
 const tokenImage = 'http://placekitten.com/200/300';
 
 try {
   if (ethereum) {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
   const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
    tokenBalance();
  } else {
    console.log('Your loss!');
  }
   } else {
    handleNoMetaMaskInstalled();
   }
 } catch (error) {
   console.log(error);
 }
}

const tokenBalance = async () => {
  if (ethereum && account) {
    const provider = new ethers.providers.Web3Provider(ethereum as any);
    /************* SUST ERC20 contract address ************* */
    const contractAddress = "0x720f4894B95698CD948D2774c0EfE45632397F8C"; 
    const contractInterface = require("./contracts/erc20Abi.json");
    const contract = new ethers.Contract(
      contractAddress,
      contractInterface,
      provider
    );
     let accounts: EthereumAccounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
    const contractWithSignature = await contract.connect(provider.getSigner());
    //const balance = await contract.balanceOf(contractWithSignature);
    if (accounts) {
      const response = await contractWithSignature.balanceOf(
        accounts[0]
      );
      //console.log("Balance is:"+ response);
      //console.log(response);
      setTokenBal(parseInt(response._hex,16));
    }
  };
}
/******************** */
  return (
    <div className="app">
      { <h1>SUStainability Tokens (SUST): Everyone's Crypto </h1> }
      <Grid container spacing={2}>
        <Grid item xs={6}>
         <p>Account</p>
        </Grid>
        <Grid item xs={6}>
        <p className="account__address">{account}</p>{!account && <button onClick={connect}>Connect Your Wallet</button>}
        </Grid>
        <Grid item xs={6}>
        Network
        </Grid>
        <Grid item xs={6}>
        <p className="account__address"> {network}</p>
        </Grid>
        <Grid item xs={6}>
        ChainId
        </Grid>
        <Grid item xs={6}>
        <p className="account__address"> {chainID}</p>
        </Grid>
        <Grid item xs={6}>
        CELO Balance
        </Grid>
        <Grid item xs={6} alignItems="center" flexDirection="column">
        <p className="account__address"> {balance}</p>
        </Grid>
      </Grid>
      

      <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={service}
              label=""
              onChange={handleChange}
            >
            <MenuItem value={'Walmart'}>Walmart</MenuItem>
            <MenuItem value={'BestBuy'}>Best Buy</MenuItem>
            <MenuItem value={'Costco'}>Costco</MenuItem>
            <MenuItem value={'RC 1'}>Recycling Depot 1</MenuItem>
            <MenuItem value={'RC 2'}>Recycling Depot 2</MenuItem>
            <MenuItem value={'RC 3'}>Recycling Depot 3</MenuItem>
            <MenuItem value={'NGO 1'}>NGO 1</MenuItem>
            <MenuItem value={'NGO 2'}>NGO 2</MenuItem>
            <MenuItem value={'NGO 3'}>NGO 3</MenuItem>
            </Select>
          </FormControl>
      </div>
      <div className="form">
        <input
          type="text"
          onChange={handleInvoiceChange}
          value={invoice}
          placeholder="Enter your invoice number"
        />
        <button onClick={sendTransaction}>Claim your SUStainability Tokens (SUST)</button>
        <div className="account__address" style={{fontSize: 'larger',     fontWeight: 'bold'}}> 
          SUST Balance: {tokenBal} 
        </div>
        <div>
        <Button color="primary" aria-label="refresh" component="label" onClick={()=>{getBalanceFromAccount(account+'');tokenBalance(); }} endIcon={<RefreshIcon/>}>
          Refresh my Balances
        </Button>
        </div>
      </div>
      { <p>Recycle - Regenarate - Restore </p> }
    </div>
  );
}

export default App;
