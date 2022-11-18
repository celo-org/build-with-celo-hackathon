import { Factory_ABI, Project_ABI } from "../ABI";
import { projectContractBytecode } from "../bytecode";
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


const factoryContractAddress = "0x0f9Dd41f1c1b1b72808f791A83518dDF0c1aC17f";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
const FactoryContract = new kit.connection.web3.eth.Contract(Factory_ABI, factoryContractAddress);
//console.log("Inside Factory Service:", FactoryContract);


export async function getProjectList() {
    const projectList = await FactoryContract.methods.getAllDeployedProjects().call();
    return projectList
}

export async function installProject(connector, projectTitle, symbol, numOfToken) {
    try {
        const create = await FactoryContract.methods.createProject(projectTitle, symbol, numOfToken);
        const encodedData = create.encodeABI();
        const txObj = {
            from: connector.accounts[0],
            to: factoryContractAddress,
            data: encodedData
        }
        const txn = await connector.sendTransaction(txObj);
        console.log("Transaction:", txn);
        return true;
    } catch {
        return false;
    }
}



