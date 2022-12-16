import { ethers } from 'ethers';
export function createProvider() {  
  return new ethers.providers.JsonRpcProvider("https://celo-hackathon.lavanet.xyz/celo-alfajores/http");
}
