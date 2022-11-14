import Web3 from "web3";
import { BigNumber } from "bignumber.js";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

type FunctionTag = string;

/**Method param type */
type MethodParam = {
  colCoverageRatio : BigNumber, 
  durationInDays : BigNumber, 
  members: Array<string>,
  amount : BigNumber,
  quorum : BigNumber,
  asset: string
}

/**Transaction param type */
type TransactionParams = {
  contractAddress: string,
  whichAccount: number;
  connector: any,
  txData: any,
  from: any,
};

/**Top level function param type */
type FuncParam = {
  functionTag?: FunctionTag, 
  members?: Array<string>,
  txn: TransactionParams,
  params: MethodParam,
  callback: Function,
  connector: any,
  contract: any,
  abi: any
}

const broadcastTransaction = async(
  params: TransactionParams, 
  contractAddress: string,
  txData : any
): Promise<any> => {
  const result = await params.connector?.sendTransaction({
    from: params.connector?.accounts[params.whichAccount],
    to: contractAddress,
    data: txData,
  });
  return result;
}


export const apis = {
  createPool: async(pm: FuncParam, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    switch (pm.functionTag) {

      case "createPublicBand":
          try {
            let txData = await contract.methods
              .createPublicPool(
                pm.params.quorum,
                pm.params.durationInDays,
                pm.params.colCoverageRatio,
                pm.params.amount,
                pm.params.asset
              )
              .encodeABI();
      
            await broadcastTransaction(pm.txn, contractAddress, txData)
          } catch (e) {
            console.log(e);
          } finally {
            pm.callback(false);
          }
      break;

      default:
        try {
          let txData = await contract.methods
            .createPrivatePool( 
              pm.params.durationInDays,
              pm.params.colCoverageRatio,
              pm.params.members,
              pm.params.asset,
              pm.params.quorum
            )
            .encodeABI();
    
          await broadcastTransaction(pm.txn, contractAddress, txData);
        } catch (e) {
          console.log(e);
        } finally {
          pm.callback(false);
        } 
      break;
    }
  },

  joinABand: async (pm: FuncParam, poolId: number, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    try {
      let txData = await contract.methods
        .joinABand(poolId)
        .encodeABI();

      await broadcastTransaction(pm.txn, contractAddress, txData);
    } catch (e) {
      console.log(e);
    } finally {
      pm.callback(false);
    }
  },

  geFinance: async (pm: FuncParam, poolId: number, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    try {
      let txData = await contract.methods
        .getFinance(poolId)
        .encodeABI();

        await broadcastTransaction(pm.txn, contractAddress, txData);
    } catch (e) {
      console.log(e);
    } finally {
      pm.callback(false);
    }
  },

  payback: async (pm: FuncParam, poolId: number, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    try {
      let txData = await contract.methods
        .payback(poolId)
        .encodeABI();

        await broadcastTransaction(pm.txn, contractAddress, txData);
    } catch (e) {
      console.log(e);
    } finally {
      pm.callback(false);
    }
  },

  cancelBand: async (pm: FuncParam, poolId: number, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    try {
      let txData = await contract.methods
        .cancelBand(poolId)
        .encodeABI();

        await broadcastTransaction(pm.txn, contractAddress, txData);
    } catch (e) {
      console.log(e);
    } finally {
      pm.callback(false);
    }
  },
  liquidate: async (pm: FuncParam, poolId: number, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    try {
      let txData = await contract.methods
        .liquidate(poolId)
        .encodeABI();

        await broadcastTransaction(pm.txn, contractAddress, txData);
    } catch (e) {
      console.log(e);
    } finally {
      pm.callback(false);
    }
  },

  completeRound: async (pm: FuncParam, poolId: number, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    try {
      let txData = await contract.methods
        .completeRound(poolId)
        .encodeABI();

        await broadcastTransaction(pm.txn, contractAddress, txData);
    } catch (e) {
      console.log(e);
    } finally {
      pm.callback(false);
    }
  },

  fetchPoolData: async(successCallback: Function, abi: any, contractAddress: string) : Promise<any> => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    let result;
      try {
        result = (await contract.methods.allPools().call());
      } catch (e) {
        console.log(e);
      } finally {
        successCallback(result? true : false);
      }
    return result;
  },

  createAccount: async (pm: FuncParam, initialAcountBalance: BigNumber, contractAddress: string) => {
    const contract = new web3.eth.Contract(pm.abi, contractAddress);
    try {
      let txData = await contract.methods
        .createAccount(
          initialAcountBalance,
          pm.connector?.accounts[pm.txn.whichAccount]
        )
        .encodeABI();

      await broadcastTransaction(pm.txn, contractAddress, txData);
    } catch (e) {
      console.log(e);
    } finally {
      pm.callback(false);
    }
  },

}