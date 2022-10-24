

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { newKit, newKitFromWeb3 } from "@celo/contractkit";
import dotenv from "dotenv";
import EventHub from '../artifacts/EventHub.json'

// LOAD ENV VAR
dotenv.config();
const web3 = new Web3(process.env.REACT_APP_DATAHUB_NODE_URL)
// export const kit = newKitFromWeb3(aweb3);

export const kit = newKit(process.env.REACT_APP_DATAHUB_NODE_URL);
const connectAccount = kit.addAccount(process.env.REACT_APP_PRIVATE_KEY);

let account = web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_PRIVATE_KEY);
const contractAddress = '0x3D093B7C47334D00aCA5bD8dBC1443c67f6Eb2f0'
kit.connection.addAccount(account.privateKey)
// CONTRACT INSTANCE
export const eventHubContract = new kit.web3.eth.Contract(
  EventHub.abi,
  contractAddress
)

export const connectWallet = async function () {
  if (window.celo) {
    try {
      const accounts = await window.celo.enable()
      return accounts[0]

      // const accounts = await kit.web3.eth.getAccounts()
      // kit.defaultAccount = accounts[0]
      // return kit.defaultAccount

      // contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
    } catch (error) {
      console.log(`⚠️ ${error}.`)
      // notification(`⚠️ ${error}.`)
    }
  } else {
    console.log("⚠️ Please install the CeloExtensionWallet.")
  }
}


export const createNewEvent = async (address, { eventTimestamp, deposit, maxCapacity, CID, ID }) => {

  //input error handling
  if (!window.celo || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  // if (message.trim() === "") {
  //   return {
  //     status: "❌ Your message cannot be an empty string.",
  //   };
  // }


  //set up transaction parameters
  // const transactionParameters = {
  //   to: contractAddress, // Required except during contract publications.
  //   from: address, // must match user's active address.
  //   data: eventHubContract.methods.createNewEvent(eventTimestamp, deposit, maxCapacity, CID, ID).encodeABI(),
  // };

  //sign the transaction
  try {
    const res = await eventHubContract.methods.createNewEvent(eventTimestamp, deposit, maxCapacity, CID, ID).call()
    console.log(res)
    // const txHash = await window.ethereum.request({
    //   method: "eth_sendTransaction",
    //   params: [transactionParameters],
    // });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};