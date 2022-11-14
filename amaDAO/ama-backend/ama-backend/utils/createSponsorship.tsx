
import { ethers } from "ethers";
import amaAbi from "../ama.abi.json";
import logger from '../utils/logger';

declare let window:any;

const contractAddr = process.env.CONTRACT;
//"0x47856ec2f682E534Ce4184FaA1655976F3310069"; // AMA Escrow Contract
//https://explorer.celo.org/alfajores/address/0x47856ec2f682E534Ce4184FaA1655976F3310069/transactions


export const createSponsorship = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddr, amaAbi, signer)

  try {  
    const sponsor = {
      title: "Celo Foundation",
      value: 20,
      settlementTime: 4000
    }
   
    logger.logInfo('create', 'object', sponsor);

    await contract.create(
        sponsor.title,
        sponsor.value,
        sponsor.settlementTime)
      .then((result) => {
        console.log(result);
      });

  } catch (error) {
    // handle error
    console.log(error);
  }
};