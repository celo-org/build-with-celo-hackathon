import { ethers } from "ethers";


const useSwap = () => {

    const getAmountInQoute = async (exchangeContract, amountOut, path) => {
        
        const amounts = await exchangeContract.getAmountsIn(amountOut, path);

        return ethers.utils.formatEther(amounts[0]);
    }

    const getAmountOutQoute = async (exchangeContract, amountIn, path) => {
        
        const amounts = await exchangeContract.getAmountsOut(amountIn, path);

        return ethers.utils.formatEther(amounts[1]);
    }

    return {
        getAmountInQoute,
        getAmountOutQoute
    };
};
export default useSwap;
