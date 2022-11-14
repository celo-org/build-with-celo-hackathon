import { config } from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';
import { BigNumber, providers, Contract, Wallet, utils } from "ethers"
import  amaAbi  from "../../../ama.abi.json";

config();

type ResponseData = {
  response: string
}

const CO2Offset = (funds:number) => {
  const offset = (funds * 11) / 24;

  return offset.toFixed(2);
}

export default async function badgeHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { query } = req
  const { address } = query

  const private_key = process.env.WALLET_PK;
  const provider = new providers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org");
  const signer = new Wallet(private_key, provider);
  const contract = new Contract("0x47856ec2f682E534Ce4184FaA1655976F3310069", amaAbi, signer);

  const nEscrow = await contract.nEscrow();
  console.log(nEscrow.toNumber());

  const Ecrows = async (address:string | string[]) => {
    console.log(address);
    let _funds = 0;
    for(let i = 0; i < nEscrow; i++) {
      const sponsor = await contract.escrowSponsor(i);
      // console.log(sponsor);
      if(sponsor == address) {
        const escrow = await contract.escrows(i + 1);
        const { funds = 0 } = { ...(escrow) };
        // console.log(funds.toNumber());
        _funds += funds.toNumber();
      }
    }
    // console.log(_funds);
    return _funds;
  }

  const funds = await Ecrows(address);
  const offset = CO2Offset(funds);
  // console.log(offset);

  return funds 
    ? res.status(200).json({response : `${offset}`})
    : res.status(400).json({response : `The Ecrow for the sponsor, ${address} is not found.`});
}
