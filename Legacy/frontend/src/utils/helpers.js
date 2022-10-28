/* eslint-disable no-implied-eval */
/* eslint-disable react-hooks/rules-of-hooks */
import {ethers} from "ethers";
import { toaster } from "evergreen-ui";
import { legacyAddress, legacyAbi } from "./contract";

export async function addTokens(tokens) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
  try {
    console.log(tokens);
    // Add tokens to Legacy
    const tx = await legacy.addTokens(tokens);
    // await tx.wait();
    return true
  } catch (error) {
    console.log(error);
    toaster.danger("An error occured!");
    return false;
  }
}

export async function createLegacy(legatee, checkInterval) {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
    const tx = await legacy.create(legatee, checkInterval);
    await tx.wait;
    return true;
  } catch (err) {
    console.log(err)
    toaster.danger('Could not create legacy');
    return false
  }
}

export async function editLegacy(legatee, checkInterval) {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
    console.log(legatee, checkInterval);
    const tx = await legacy.updateLegacy(legatee, checkInterval);
    await tx.wait();
    return true;
  } catch (err) {
    console.log(err)
    toaster.danger('Could not edit legacy');
    return false
  }
}

export const hasLegacy = async(address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const legacy = new ethers.Contract(legacyAddress, legacyAbi, provider);
  const legacyIndex = Number(await legacy.legacyIndexes(address));
  if (legacyIndex == 0) {
    return false;
  } else {
    return true;
  }
}

export const getLegacyTokens = async(address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const legacy = new ethers.Contract(legacyAddress, legacyAbi, provider);
  const legacyIndex = Number(await legacy.legacyIndexes(address));
  const tokens = await legacy.getLegacyTokens(legacyIndex);
  return tokens;
}

export async function connect() {
  if(window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaef3' }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: "0xaef3",
                chainName: "Celo Alfajores Testnet",
                nativeCurrency: { name: "Alfajores Celo", symbol: "CELO", decimals: 18 },
                rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
                blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
                iconUrls: ["future"],
              }
            ],
          });
        } catch (addError) {
          console.error(addError);
          toaster.danger('failed to add network to metamask');
          return;
        }
      } else {
        console.log(error);
        toaster.danger('failed to switch network to CoinEx smartchain')
        return;
      }
    }
      window.alert("Legacy would be able to see your wallet address and account balance")
        const accounts = await window.ethereum
          .request({ method: 'eth_requestAccounts' })
          localStorage.removeItem('isDisconnected')
          return accounts[0];
    }
}


export const disconnect = () => {
  localStorage.setItem("isDisconnected", "true");
}

export const isDisconnected = () => {
  if (localStorage.getItem('isDisconnected')) {
    return true
  } else {
    return false
  }
}

export async function checkConnection() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
  } catch (error) {
    console.log(error)
  }
}

const getUserInterval = async() => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const legacy = new ethers.Contract(legacyAddress, legacyAbi, signer);
          //TODO
          //Display loader
          const index = await legacy.legacyIndexes(await checkConnection());
            const res = await legacy.legacies(Number(index))
            console.log(res)
              const legatee = res[1];
              //Convert lastSeen to minutes (just for the sake of demo)
              let ls = Math.floor( ((Number(new Date()) / 1000) - Number(res[2])) / (3600 * 24) );
              const lastSeen = ls == 0 ? "Today" : `${ls} days ago`;
              //Convert checkInterval to seconds (just for the sake of demo)
              const secs = Number(res[3]);
              const intervalMins = Math.floor(secs / (3600 * 24));
              const interval = `Every ${intervalMins} days`;
              return {legatee, lastSeen, interval};
        } catch (error) {
          toaster.danger('An error occured!')
          return;
        }
};

export default getUserInterval;