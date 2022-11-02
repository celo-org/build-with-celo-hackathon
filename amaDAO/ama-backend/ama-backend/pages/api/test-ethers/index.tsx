import { NextApiRequest, NextApiResponse } from 'next'
import { BigNumber, ethers } from "ethers";

import storageAbi from "../../../storage.abi.json";

type ResponseError = {
  message: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<String | ResponseError>
) => {
  const privateKey = "0x1c1a49fea9a4ede1dc8e582639f498d41fa3c4a9e2ab2b9d740a4a3ec14e1cbf"; //test wallet
  //const chainId = 1313161555; //Celo Alfajores 

  // setup provider
  //ethers.providers.getDefaultProvider(chainId); //network not found, so let's use RPC approach:
  const provider = new ethers.providers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org");

  console.log(provider);
  // signer for your transactions 
  const signer = new ethers.Wallet(privateKey, provider);
  //const signer = provider.getSigner(); 
  console.log(signer);

  const contract = new ethers.Contract("0x15084Af99493C80E537C24647957CBC4b2b566f7", storageAbi, signer)

  console.log(contract);
  //await contract.store("200", signer ); <--- need to resolve signer correctly if we want to write.  But read is fine.

  const valRet:BigNumber = await contract.retrieve();
  console.log("Value", valRet);

  return valRet._isBigNumber
    ? res.status(200).json( valRet._hex )
    : res.status(404).json({ message: `Contract with id: ${signer} not found.` })
}

