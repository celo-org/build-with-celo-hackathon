{/**
  A utility file that interacts with Quatrefinance's contracts on Celo network.
  Note: We leverage Celo libraries to make work easier for us.
  - Uses nested switch statements to navigate between onchain functions.
  - Top level statement accepts a contract name, then move to innner ones. 

*/}

import Web3 from "web3";
import { useCelo } from "@celo/react-celo";
import { contractsData } from "../loadContractFictures";
import { newKitFromWeb3 } from "@celo/contractkit/lib/kit";
import { OptionProps } from "../propsTypes";

const {
  token,
  digesu,
  alcManager,
  // digesuTypes,
  // managerTypes
} = contractsData;

export const sendtransaction = () =>{
  const { network, address } = useCelo();
  console.log("network.rpcUrl", network.rpcUrl);
  const createContractKit = newKitFromWeb3(new Web3(network.rpcUrl));
  const _alcMngrAbi : any = alcManager.abi;
  const _digesuAbi: any = digesu.abi;
  const _tokenAbi: any = token.abi;

  const managerInstance = new createContractKit.connection.web3.eth.Contract(_alcMngrAbi, alcManager.address);
  const digesuInstance = new createContractKit.connection.web3.eth.Contract(_digesuAbi, digesu.address);
  const tokenInstance = new createContractKit.connection.web3.eth.Contract(_tokenAbi, token.address);

  return {
    sendTransaction: async(option : OptionProps) => {
      const { contractName, functionName, params } = option;

      const extradata = {
        from: address,
        gasPrice: createContractKit.connection.gasPrice()
      }
      
      let receipt : any;
      switch (contractName) {
        case 'manager':
          let tx = await managerInstance.methods.createAccount(...params).send({...extradata})
          receipt = await tx.wait();
          break;
        
        case 'digesu':
          receipt = await tokenInstance.methods.balanceOf(address).call();
          break;
        
        default: 
          switch (functionName) {
            case 'createPublicPool':
              let tx = await digesuInstance.methods.createPublicPool(...params).send({...extradata});
              receipt = await tx.wait();
              break;

            case 'createPrivatePool':
              let tx1 = await digesuInstance.methods.createPrivatePool(...params).send({...extradata});
              receipt = await tx1.wait();
              break;

            case 'joinABand':
              let tx2 = await digesuInstance.methods.joinABand(...params).send({...extradata});
              receipt = await tx2.wait();
              break;

            case 'getFinance':
              let tx3 = await digesuInstance.methods.getFinance(...params).send({...extradata});
              receipt = await tx3.wait();
              break;

            case 'payback':
              let tx4 = await digesuInstance.methods.payback(...params).send({...extradata});
              receipt = await tx4.wait();
              break;

            case 'liquidate':
              let tx5 = await digesuInstance.methods.liquidate(...params).send({...extradata});
              receipt = await tx5.wait();
              break;

            case 'completeRound':
              let tx6 = await digesuInstance.methods.completeRound(...params).send({...extradata});
              receipt = await tx6.wait();
              break;

            default:
              receipt = await digesuInstance.methods.getPools().call();
              break;
          }
          break;
      }
      return receipt;
    },
  }
}

    // return Web3Contractkit.connection.web3.eth.Contract(
  
    // )
  