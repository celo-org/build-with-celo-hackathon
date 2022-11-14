

import { BigNumber, ethers } from "ethers";
import amaAbi from "../ama.abi.json";

/**
 * backend connect to blockchain 
 * @returns contract object for direct requests
 **/

function contractConnect() 
{
  const rpcUrl = process.env.RPC;
  const contractAddr =  process.env.CONTRACT; 
  const privateKey = process.env.WALLET_PK; // "0x1c1a49fea9a4ede1dc8e582639f498d41fa3c4a9e2ab2b9d740a4a3ec14e1cbf"; //test wallet
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  console.log(provider);
  // signer for your transactions 
  const signer = new ethers.Wallet(privateKey, provider);
  //const signer = provider.getSigner(); 
  console.log(signer);

  const contract = new ethers.Contract(contractAddr, amaAbi, signer)

  console.log(contract);

  return contract;
}


export default contractConnect;