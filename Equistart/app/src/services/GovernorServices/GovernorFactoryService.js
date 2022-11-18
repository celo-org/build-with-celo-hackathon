import {MyGovernorABI, myGovernorFactoryABI, myGovernorBYTE_CODE} from '../../ABIs/GovernorABI';
import {testGovernorBYTE_CODE} from '../../ABIs/GovernorAB';
import {TimelockABI, timelockBYTE_CODE} from '../../ABIs/TimelockABI';
// import { projectContractBytecode } from "../bytecode";
import Web3 from 'web3';
import {newKitFromWeb3} from '@celo/contractkit';

const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = newKitFromWeb3(web3);



export async function deployTimelock(connector, delay, proposers, executors) {
  try {
    let timelockContract = new kit.connection.web3.eth.Contract(TimelockABI);
    const bytecodeWithParams = timelockContract.deploy({
      data:timelockBYTE_CODE.object,
      arguments: [delay, proposers, executors],
    });
    let txObj = {
      from: connector.accounts[0],
      data: bytecodeWithParams.encodeABI(),
      gas:1500000, 
      gasPrice:web3.utils.toWei('0.00003', 'ether')
    };
    const tx = await connector.sendTransaction(txObj)
    const receipt = await kit.connection.web3.eth.getTransactionReceipt(tx)
    const timelockAddr = receipt.contractAddress
    console.log("Contract Address: ", timelockAddr);    
    return timelockAddr;
  } catch (error) {
    console.log("WARNING - ERROR!!!", error);
  }
}


export async function deployGovernor(connector, timelock, token){
    try {
        let governorContract = new kit.connection.web3.eth.Contract(MyGovernorABI);
        const bytecodeWithParams = governorContract.deploy({
            data: testGovernorBYTE_CODE.object,
            arguments: [token, timelock]
        });
        let txObj = {
            from : connector.accounts[0],
            data: bytecodeWithParams.encodeABI(),
            gas:1500000, 
            gasPrice:web3.utils.toWei('0.00003', 'ether')
        };
        const tx = await connector.sendTransaction(txObj);
        const receipt = await kit.connection.web3.eth.getTransactionReceipt(tx);
        const governorAddr = receipt.contractAddress;
        console.log("Governor Contract Address: ", governorAddr);
        return governorAddr;


    } catch (error) {
        console.log("ERROR DEPLOYING GOVERNOR!!!", error);
    }
}



// const governorFactoryContractAddress = "0x2597bb75ec7331F59f670a5520171B51442Bef19";
const governorFactoryContractAddress = "0xa1d00f8be9e4ca67c2bc5976ed1b75b0c6d27872";
const factoryContract = new kit.connection.web3.eth.Contract(myGovernorFactoryABI, governorFactoryContractAddress);

export async function updateGovernorFactory(connector, governor, timelock, token){
    try {
        const addContractAddresses = await factoryContract.methods.addGovernorAddress(governor, timelock, token);
        const txObj = {
            from: connector.accounts[0],
            to: governorFactoryContractAddress,
            data: addContractAddresses.encodeABI()
        }
        const trx = await connector.sendTransaction(txObj);
        console.log("Updating Contract Addresses to Factory, Transaction Id:",trx);
    } catch (error) {
        console.log("ERROR WHile updating Governor Factory:", error);
    }
}

export async function getAllDeployedGovernors(){
    const allGovernorsList = await factoryContract.methods.getAllDeployedGovernor().call();
    return allGovernorsList;
}

export async function grantProposerToGovernor (connector, governor, timelock){
  const timelockContract = new kit.connection.web3.Contract(TimelockABI, timelock);
  const proposerROLE = await timelockContract.methods.PROPOSER_ROLE().call();
  console.log("Proposer Role: ", proposerROLE);
  const grantProposer =  timelockContract.methods.grantRole(proposerROLE, governor);
  const txObj = {
    from: connector.accounts[0],
    to: timelock,
    data: grantProposer.encodeABI()
  }
  const trx = await connector.sendTransaction(txObj);
  console.log("Grant Proposer role to Governor Contract:", trx);
  return trx
}

//Valora behaves abnormally around this function.
//Transactions get stuck, and does not show signing popup on valora.
//Should close the application, and restart it to sign the transaction.
//If you might have created multiple transactions but didn't find popup.
//Might close the app manually and restart multiple times, until all transactions are clear.