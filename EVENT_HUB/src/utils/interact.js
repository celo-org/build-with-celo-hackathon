
import EventHub from '../artifacts/contracts/EventHub.sol/EventHub.json'
import React from "react";
const eventHubContractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'

export const contract = async kit => {
  // const kit = await getConnectedKit()
  return new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
}


export const createNewEvent = async (contract, address, { eventTimestamp, deposit, maxCapacity, CID, ID }) => {

  try {
    const res = await contract.methods.createNewEvent(eventTimestamp, deposit, maxCapacity, CID, ID).call()
return console.log(res)
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
