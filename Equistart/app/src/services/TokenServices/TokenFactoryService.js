// import { Factory_ABI, Project_ABI } from "../ABI";
import {TokenFactoryABI} from '../../ABIs/TokenABI';
// import { projectContractBytecode } from "../bytecode";
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


const tokenFactoryContractAddress = "0x9aaa66ead37dfd05ff8470af9d143bcbe1497c97";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
const TokenFactoryContract = new kit.connection.web3.eth.Contract(TokenFactoryABI, tokenFactoryContractAddress);
//console.log("Inside Factory Service:", FactoryContract);


export async function getAllDeployedTokens () {
    const allTokenList = await TokenFactoryContract.methods.getAllDeployedProjects().call();
    return allTokenList;
}

export async function createNewToken(connector, tokenName, symbol, numOfToken, beneficiaryAddr) {
    try {
        const create = await TokenFactoryContract.methods.createProject(tokenName, symbol, numOfToken, beneficiaryAddr);
        const encodedData = create.encodeABI();
        const txObj = {
            from: connector.accounts[0],
            to: tokenFactoryContractAddress,
            data: encodedData
        }
        const txn = await connector.sendTransaction(txObj);
        console.log("Transaction:", txn);
        return true;
    } catch {
        return false;
    }
}




// export async function getProjectList() {
//     const projectList = await FactoryContract.methods.getAllDeployedProjects().call();
//     return projectList
// }


