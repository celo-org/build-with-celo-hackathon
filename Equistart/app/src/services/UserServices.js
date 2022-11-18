import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { Factory_ABI, Project_ABI } from '../ABI';
import React from 'react';

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
var kit = newKitFromWeb3(web3);

export const fetchUserBalance = async (projectAddress, connector) => {
  let contract = new kit.connection.web3.eth.Contract(Project_ABI, projectAddress);
  let val = await contract.methods.balanceOf(connector.accounts[0]).call();
  return val;
};