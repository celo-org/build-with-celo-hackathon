import { ethers } from "ethers";
import fs from 'fs';
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
const __dirname = dirname(fileURLToPath(import.meta.url));
const BCTABIfile = fs.readFileSync(__dirname + '/contracts/bctabi.json');
const BCT_ABI = JSON.parse(BCTABIfile)

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
        const tx = await contract.transfer(to, numberOfTokens)
        return tx;
    } catch (err) {
        console.error(err)
    }
}

const tokenMapper = [
    {
        name: "BTC",
        abi: BCT_ABI,
        provider: new CeloProvider('https://alfajores-forno.celo-testnet.org'),
        address: "0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb"
    },
    {
        name: "GoerliETH",
        abi: null,
        provider: new ethers.providers.getDefaultProvider('goerli'),
        address: null
    },
    {
        name: "CELO",
        abi: null,
        provider: new CeloProvider('https://alfajores-forno.celo-testnet.org'),
        address: null
    }
]


export async function getBalance(address, token) {
    try {
        const tokenData = tokenMapper.find(t => t.name === token);
        const provider = tokenData.provider
        const tokenAdress = tokenData.address;
        const tokenABI = tokenData.abi;
        let balance;

        if (!tokenAdress) {
            balance = await provider.getBalance(address);
        } else {
            const contract = new ethers.Contract(tokenAdress, tokenABI, provider);
            balance = await contract.balanceOf(address);
        }

        const formattedBalance = ethers.utils.formatUnits(balance);
        return formattedBalance;
    } catch (err) {
        console.error(err);
    }
}