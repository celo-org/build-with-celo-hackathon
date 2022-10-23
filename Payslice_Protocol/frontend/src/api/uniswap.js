import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import IUniswapV3PoolArtifact from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { useContract, useProvider, useSigner } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { useRef, useState } from "react";
import QuoterArtifact from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { erc20ABI } from "wagmi";
import { PoolAddress } from "../constants/invoicedata";
import { ExchangeInterface} from "../interface";

const QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

const useSwap = () => {
    const provider = useProvider();

    const quoterContract = useContract({
        addressOrName: QUOTER_CONTRACT_ADDRESS,
        contractInterface: QuoterArtifact.abi,
        signerOrProvider: provider,
    });
    
    
    const [fromTokenPrice, setFromTokenPrice] = useState(null);
    const [toTokenPrice, setToTokenPrice] = useState(null);

    const fromTokenRef = useRef(null);
    const toTokenRef = useRef(null);
    const poolRef = useRef(null);

    const changePool = async (fromTokenSymbol, toTokenSymbol) => {
        
        try {
            const poolContractAddress = getPoolContractAddress(
                fromTokenSymbol,
                toTokenSymbol
            );
            const poolContract = createPoolContract(poolContractAddress);

            
            const [immutables, state] = await Promise.all([
                getPoolImmutables(poolContract),
                getPoolState(poolContract),
            ]);

            const token0Contract = createTokenContract(immutables.token0);
            const token1Contract = createTokenContract(immutables.token1);

            const [token0, token1] = await Promise.all([
                createToken(token0Contract),
                createToken(token1Contract),
            ]);

            const pool = new Pool(
                token0,
                token1,
                immutables.fee,
                state.sqrtPriceX96.toString(),
                state.liquidity.toString(),
                state.tick
            );
            poolRef.current = pool;

            let fromTokenPrice, toTokenPrice;

            if (fromTokenSymbol === token0.symbol) {
                fromTokenRef.current = token0;
                toTokenRef.current = token1;
                fromTokenPrice = pool.token0Price.toFixed(token1.decimals);
                toTokenPrice = pool.token1Price.toFixed(token0.decimals);
            } else {
                fromTokenRef.current = token1;
                toTokenRef.current = token0;
                fromTokenPrice = pool.token1Price.toFixed(token0.decimals);
                toTokenPrice = pool.token0Price.toFixed(token1.decimals);
            }

            setFromTokenPrice(fromTokenPrice);
            setToTokenPrice(toTokenPrice);
        } catch (err) {
            console.error("Error trying to initialize a pool", err);
            throw err;
        }
    };

    const getPoolContractAddress = (fromTokenSymbol, toTokenSymbol) => {
        const pool =
            PoolAddress[`${fromTokenSymbol}${toTokenSymbol}`] ||
            PoolAddress[`${toTokenSymbol}${fromTokenSymbol}`];

        if (!pool)
            throw new Error("No pool could be found for the selected tokens");
        return pool;
    };

    const createPoolContract = (poolContractAddress) => {
        const poolContract = new ethers.Contract(
            poolContractAddress,
            IUniswapV3PoolArtifact.abi,
            provider
        );
        return poolContract;
    };

    const getPoolImmutables = async (poolContract) => {
        const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
            await Promise.all([
                poolContract.factory(),
                poolContract.token0(),
                poolContract.token1(),
                poolContract.fee(),
                poolContract.tickSpacing(),
                poolContract.maxLiquidityPerTick(),
            ]);

        const poolImmutables = {
            factory,
            token0,
            token1,
            fee,
            tickSpacing,
            maxLiquidityPerTick,
        };
        return poolImmutables;
    };

    const getPoolState = async (poolContract) => {
        const [liquidity, slot] = await Promise.all([
            poolContract.liquidity(),
            poolContract.slot0(),
        ]);

        const PoolState = {
            liquidity,
            sqrtPriceX96: slot[0],
            tick: slot[1],
            observationIndex: slot[2],
            observationCardinality: slot[3],
            observationCardinalityNext: slot[4],
            feeProtocol: slot[5],
            unlocked: slot[6],
        };

        return PoolState;
    };

    const createTokenContract = (tokenContractAddress) => {
        const tokenContract = new ethers.Contract(
            tokenContractAddress,
            erc20ABI,
            provider
        );
        return tokenContract;
    };

    const createToken = async (tokenContract, chain = polygonMumbai) => {
        const tokenImmutables = await getTokenImmutables(tokenContract);
        const token = new Token(
            chain.id,
            tokenContract.address,
            tokenImmutables.decimals,
            tokenImmutables.symbol,
            tokenImmutables.name
        );
        return token;
    };

    const getTokenImmutables = async (tokenContract) => {
        const [decimals, symbol, name] = await Promise.all([
            tokenContract.decimals(),
            tokenContract.symbol(),
            tokenContract.name(),
        ]);

        const tokenImmutables = {
            decimals,
            symbol,
            name,
        };

        return tokenImmutables;
    };

    const getQuoteReverse = async (amountIn) => {
        try {
            const pool = poolRef.current;
            if (!pool) throw new Error("pool is undefined");

            const fromToken = fromTokenRef.current;
            if (!fromToken) throw new Error("fromToken is undefined");

            const toToken = toTokenRef.current;
            if (!toToken) throw new Error("toToken is undefined");

            const parsedAmountIn = ethers.utils.parseUnits(
                amountIn.toString(),
                fromToken.decimals
            );

            const amountOut =
                await quoterContract.callStatic.quoteExactOutputSingle(
                    toToken.address,
                    fromToken.address,
                    pool.fee,
                    parsedAmountIn.toString(),
                    0
                );

            const formattedAmountOut = ethers.utils.formatUnits(
                amountOut,
                toToken.decimals
            );

            return {
                amountOut: formattedAmountOut,
                amountOutBigInt: amountOut,
				amountInBigInt: parsedAmountIn,
                fee: pool.fee,
				sqrtPriceX96: pool?.sqrtRatioX96[0]
            };
        } catch (err) {
            console.error("Error trying to get a quote", err);
            throw err;
        }
    };

    const getAmountInQoute = async (exchangeContract, amountOut, path) => {
        
        const amounts = await exchangeContract.getAmountsIn(amountOut, path);

        return ethers.utils.formatEther(amounts[0]);
    }

    const getAmountOutQoute = async (exchangeContract, amountIn, path) => {
        
        const amounts = await exchangeContract.getAmountsOut(amountIn, path);

        return ethers.utils.formatEther(amounts[1]);
    }

    return {
        fromToken: fromTokenRef.current,
        toToken: toTokenRef.current,
        pool: poolRef.current,
        fromTokenPrice,
        toTokenPrice,
        changePool,
        getQuoteReverse,
        getAmountInQoute,
        getAmountOutQoute
    };
};
export default useSwap;
