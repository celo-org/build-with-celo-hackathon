import { Factory_ABI, Project_ABI } from "../ABI";
import { projectContractBytecode } from "../bytecode";
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';


const contractAddress = "0x0f9Dd41f1c1b1b72808f791A83518dDF0c1aC17f";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
const FactoryContract = new kit.connection.web3.eth.Contract(Factory_ABI, contractAddress);


export async function getProposalList(address) {
    let contract = new kit.connection.web3.eth.Contract(Project_ABI, address);
    let proposalList = await contract.methods.getAllProposals().call();
    return proposalList;
}

export const createProposal = async (address, header, description, connector) => {
    try {
        let projectContract = new kit.connection.web3.eth.Contract(Project_ABI, address);
        let proposal = await projectContract.methods.createGeneralProposal(header, description);
        console.log(address, proposal)
        let encodedData = proposal.encodeABI();
        const txObj = {
            from: connector.accounts[0],
            to: address,
            data: encodedData,

        }
        await connector.sendTransaction(txObj);
        return true;
    } catch (error) {
        console.log("ERROR:", error);
        return false;
    }
}

export const castVote = async(address, connector, proposalId, vote) => {
    try {
        let projectContract = new kit.connection.web3.eth.Contract(Project_ABI, address);
        let proposal = await projectContract.methods.vote(proposalId, vote);
        console.log(address, proposal)
        let encodedData = proposal.encodeABI();
        const txObj = {
            from: connector.accounts[0],
            to: address,
            data: encodedData,

        }
        await connector.sendTransaction(txObj);
        return true;
    } catch (error) {
        console.log("ERROR:", error);
        return false;
    }
}