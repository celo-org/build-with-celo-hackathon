import { ethers } from "ethers";
import fs from 'fs';
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { uuid } from 'uuidv4';
import fleekStorage from "@fleekhq/fleek-storage-js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const BCTABIfile = fs.readFileSync(__dirname + '/contracts/bctabi.json');
const BCT_ABI = JSON.parse(BCTABIfile)
const TREASURYABIfile = fs.readFileSync(__dirname + '/contracts/treasuryabi.json');
const TREASURY_ABI = JSON.parse(TREASURYABIfile)


const baseURI = "https://ipfs.fleek.co/ipfs";

const createNFTKey = async () => {
    const newTokenId = uuid();
    return Buffer.from(`${process.env.USER_ADDRESS}-${newTokenId}`, "binary").toString("base64");
};

export async function createWallet() {
    try {
        // create EVM universal wallet
        const wallet = ethers.Wallet.createRandom();
        return wallet;

    } catch (err) {
        console.error(err);

    }
}

export async function mintNFT(to) {
    console.log("Check eligibility for user ", to, "...")
    // TODO check
    const eligible = true;
    if (!eligible) return;
    console.log("Check successful..")
    if (!process.env.FLEEK_SECRET || !process.env.FLEEK_KEY) return;

    const key = await createNFTKey();

    const hash = "bafybeiffgn6np3qbh4kvfyugixrdw3lcxsbalu3u7pst2idhlye7fj5o3q";
    const publicUrl =
        "https://storageapi.fleek.co/3eea4509-9e8c-402f-9952-904956288853-bucket/haru-icon.png";

    const metadata = {
        description: "A collection of proudly minted ZENA NFTs that capture carbon.",
        external_url: publicUrl,
        image: `${baseURI}/${hash}`,
        name: `ZENA - impact for carbon capturing`,
    };
    console.log(metadata)
    const metadataURI = await fleekStorage.upload({
        apiKey: process.env.FLEEK_KEY,
        apiSecret: process.env.FLEEK_SECRET,
        key: key,
        data: Buffer.from(JSON.stringify(metadata)),
    });
    console.log(metadataURI)

    try {
        // Alfajores Testnet
        const provider = new CeloProvider(process.env.RPC_URL)
        const signer = new CeloWallet(process.env.USER_PRIVATE_KEY, provider)
        var contract = new ethers.Contract(process.env.ZENA_TREASURY, TREASURY_ABI, signer);
        console.log(contract)
        const tx = await contract
            .connect(signer)
            .mintNFT(`${baseURI}/${metadataURI.hash}`);
        const result = await tx.wait();
        console.log(result)
        return result;
    } catch (err) {
        console.error(err)
    }
}

// deprecated
// export async function rewardBTC(to, amount) {
//     try {
//         // Alfajores Testmet
//         const provider = new CeloProvider(process.env.RPC_URL)
//         const signer = new CeloWallet(process.env.ZENA_PRIVATE_KEY, provider)
//         const BCT_ADDRESS = "0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb";
//         var contract = new ethers.Contract(BCT_ADDRESS, BCT_ABI, signer);

//         var numberOfDecimals = 18;
//         var numberOfTokens = ethers.utils.parseUnits('0.01', numberOfDecimals);

//         // Send tokens
//         const tx = await contract.transfer(to, numberOfTokens)
//         return tx;
//     } catch (err) {
//         console.error(err)
//     }
// }

const tokenMapper = [
    {
        name: "BCT",
        abi: BCT_ABI,
        provider: new CeloProvider(process.env.RPC_URL),
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
        provider: new CeloProvider(process.env.RPC_URL),
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