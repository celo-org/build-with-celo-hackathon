import { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from "ethers";

import storageAbi from "../../../storage.abi.json";

type ResponseError = {
  message: string
}

export default function testHandler(
  req: NextApiRequest,
  res: NextApiResponse<Number | ResponseError>
) {
  const privateKey = "0x1c1a49fea9a4ede1dc8e582639f498d41fa3c4a9e2ab2b9d740a4a3ec14e1cbf"; //test wallet
  //const port = 3001;
  const chainId = 1313161555; //Celo Alfajores 

  // set provider for chain
  //const network = ethers.providers.getNetwork(chainId);
  // const network = {
  //   name: "Alfajores",
  //   chainId: chainId,
  //   ensAddress: customEnsAddress
  // };

  const provider = ethers.providers.getDefaultProvider(chainId); //network
  
  // signer for your transactions 
  const signer = new ethers.Wallet(privateKey, provider);

  // const ABI = require('./abi/storage.abi.json');

  // 
  const contract = new ethers.Contract("0x15084Af99493C80E537C24647957CBC4b2b566f7", storageAbi, signer)

  //contract.store("200", signer );

  var valRet = contract.retrieve();
  
  return valRet;


  // contract.on("Transfer", (src, dst, wad) => {
  //   set(dst)
  // })

  // async function set(dst) {
  //     const tx = await contract.set(dst);
  //     await tx.wait()
  // }

  // app.listen(port, () => {
  //   console.log(`Example app listening on port ${port}`)
  // })

}

