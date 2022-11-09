import contract from "./contracts/Sacuda.sol/Sacuda.json";

export const contractAbi = contract.abi;

export const contractAddress = '0xB05b4290cD6d5AD0925d89ADfda0149ee1dCCACa';

export const contractConfig = {
    address: contractAddress,
    abi: contractAbi,
    watch: true,
    chainId: 44787
}

export const contractWriteConfig = {
    address: contractAddress,
    abi: contractAbi,
    mode: "recklesslyUnprepared",
}