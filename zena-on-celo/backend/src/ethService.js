import { ethers, Wallet, utils } from "ethers";

export async function createWallet(req, res, next) {
    try {
        const provider = ethers.providers.getDefaultProvider(4);
        // const signer = provider.getSigner();
        // const wallet = new ethers.Wallet("privateKey!!", provider);

        // create EVM universal wallet
        const wallet = ethers.Wallet.createRandom();
        console.log('address:', wallet.address)
        console.log('mnemonic:', wallet.mnemonic.phrase)
        console.log('privateKey:', wallet.privateKey)

    } catch (err) {
        next(err);
    }
}