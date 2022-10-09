import { ethers } from "ethers";
import fs from 'fs';
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = fs.readFileSync(__dirname + '/contracts/bctabi.json');
const BCT_ABI = JSON.parse(file)

export async function createWallet() {
    try {
        // create EVM universal wallet
        const wallet = ethers.Wallet.createRandom();
        return wallet;

    } catch (err) {
        console.error(err);
    }
}

export async function rewardBTC(to, amount) {
    try {
        // Alfajores Testmet
        const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')
        const signer = new CeloWallet(process.env.ZENA_PRIVATE_KEY, provider)
        const BCT_ADDRESS = "0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb";
        var contract = new ethers.Contract(BCT_ADDRESS, BCT_ABI, signer);

        var numberOfDecimals = 18;
        var numberOfTokens = ethers.utils.parseUnits('0.01', numberOfDecimals);

        // Send tokens
        contract.transfer(to, numberOfTokens).then(function (tx) {
            console.log(tx);
        });
    } catch (err) {
        console.error(err)
    }
}

export async function getBalance(address, token) {
    token = "BCT";
    // always BCT for now

    try {
        // Alfajores Testnet
        const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org')

        // BCT contract on Alfjaroes
        const BCT_ADDRESS = "0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb";
        // or 
        // const abi = ["function balanceOf(walletAddress) view returns (uint256)"];

        const contract = new ethers.Contract(BCT_ADDRESS, BCT_ABI, provider)
        const balance = await contract.balanceOf(address);
        const formattedBalance = ethers.utils.formatUnits(balance)
        return formattedBalance;
    } catch (err) {
        console.error(err);
    }
}