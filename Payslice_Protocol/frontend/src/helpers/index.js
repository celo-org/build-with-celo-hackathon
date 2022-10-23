import { ethers } from "ethers";
import IWethAbi from "../interface/iweth.json";
import { erc20ABI } from "wagmi";

export const getPoolImmutables = async (poolContract) => {
    const [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    ]);

    const immutables = {
        token0: token0,
        token1: token1,
        fee: fee,
    };
    return immutables;
};

export const getPoolState = async (poolContract) => {
    const slot = poolContract.slot0();

    const state = {
        sqrtPriceX96: slot[0],
    };

    return state;
};

export const swapEthToWeth = async (signer, amount) => {
	const wethContract = new ethers.Contract("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",IWethAbi, signer);
	await wethContract.connect(signer).deposit({ value: amount });     
}

export const checkBalance =  async(tokenAddress, signer, address) => {
	const wethContract = new ethers.Contract(tokenAddress,IWethAbi, signer);
	return await wethContract.balanceOf(address || signer.getAddress())    
}

export const checkAllowance = async(tokenAddress, signer, ownerAddress, spenderAddress) => {
    const wethContract = new ethers.Contract(tokenAddress,IWethAbi, signer);
	return await wethContract.allowance(ownerAddress, spenderAddress);    
}

export const approve = async(tokenAddress, signer, spenderAddress, amount) => {
	const wethContract = new ethers.Contract(tokenAddress,IWethAbi, signer);
	const txn = await wethContract
	.connect(signer)
	.approve( spenderAddress, amount);

	await txn.wait();
	console.log('done');
}

export const createTokenContract = (tokenContractAddress, signerOrProvider) => {
    const tokenContract = new ethers.Contract(
        tokenContractAddress,
        erc20ABI,
        signerOrProvider
    );
    return tokenContract;
};

