import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { useSigner, useProvider, useAccount } from "wagmi";
// Headless-UI ---->
import { Popover } from "@headlessui/react";
// React-Icons ---->
import { FiAlertCircle } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import BeatLoader from "react-spinners/BeatLoader";
// Utils ---------->
import { priceFormatter } from "./../utils/priceFormatter";
// Contract ------->
import { ERC20ABI } from "./../utils/abi";
import { helpiAddress, celoAddress } from "./../utils/addresses";
// Uniswap -------->
import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
import JSBI from "jsbi";

function Swapping() {
  // wagmi ---------------------------
  const { data: signer, isError, isLoading } = useSigner();
  const { address } = useAccount();
  const provider = useProvider();
  console.log("Singer:", signer, "Error:", isError, "Loading:", isLoading);
  // useState ---------------------------
  const [balance, setBalance] = useState({});
  const [swappingHelpi, setSwappingHelpi] = useState(0);
  const [swappingCelo, setSwappingCelo] = useState(0);
  const [slippage, setSlippage] = useState(1);
  const [deadline, setDeadline] = useState(10);
  const [swappingTx, setSwappingTx] = useState([]);
  const [swappingTransaction, setSwappingTransaction] = useState([]);
  const [swappingTxStatus, setSwappingTxStatus] = useState({
    success: false,
    isLoading: false,
  });
  console.log("SwaPPing", swappingTx);

  let helpiContract, celoContract;
  if (!isError && !isLoading) {
    helpiContract = new ethers.Contract(helpiAddress, ERC20ABI, signer);
    celoContract = new ethers.Contract(celoAddress, ERC20ABI, signer);
  }

  const handleGetBalance = async () => {
    const helpiToken = await helpiContract
      .balanceOf(address)
      .then((balance) => {
        return priceFormatter(parseInt(balance, 10) / 1e18, "");
      });
    const celoToken = await celoContract.balanceOf(address).then((balance) => {
      return priceFormatter(parseInt(balance, 10) / 1e18, "");
    });
    setBalance({ helpiToken, celoToken });
  };

  const chainId = 44787;

  const name0 = "CELO Alfajores";
  const symbol0 = "CELO";
  const decimals0 = 18;
  const address0 = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";

  const name1 = "Helpi V2 Token";
  const symbol1 = "HLP";
  const decimals1 = 18;
  const address1 = "0xF827Cd1cA13CC4431AAa7923A6087270BfD3dbee";

  const CELO = new Token(chainId, address0, decimals0, symbol0, name0);
  const HLP = new Token(chainId, address1, decimals1, symbol1, name1);

  // const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45"; // Tutoral Address
  // const V3_SWAP_ROUTER_ADDRESS = "0xbbb998d4c99e6e272d6f612e644fa5be743fe4f4"; // Pool Address
  const V3_SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Throught Doc

  // const POOL_ADDRESS = "0xbbb998d4c99e6e272d6f612e644fa5be743fe4f4";
  // const SWAP_ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

  const router = new AlphaRouter({ chainId: chainId, provider });

  const getPrice = async (
    inputAmount,
    slippageAmount,
    deadline,
    walletAddress
  ) => {
    setSwappingTxStatus({ success: false, isLoading: true });
    const percentSlippage = new Percent(slippageAmount, 100);
    const wei = ethers.utils.parseUnits(inputAmount.toString(), 18);
    const currencyAmount = CurrencyAmount.fromRawAmount(CELO, JSBI.BigInt(wei));

    const route = await router.route(
      currencyAmount,
      HLP,
      TradeType.EXACT_INPUT,
      {
        recipient: walletAddress,
        slippageTolerance: percentSlippage,
        deadline: deadline,
      }
    );

    const transaction = {
      data: route.methodParameters.calldata,
      to: V3_SWAP_ROUTER_ADDRESS,
      value: BigNumber.from(route.methodParameters.value),
      from: walletAddress,
      gasPrice: BigNumber.from(route.gasPriceWei),
      gasLimit: ethers.utils.hexlify(1000000),
    };

    const quoteAmountOut = route.quote.toFixed(6);
    const ratio = priceFormatter(inputAmount / quoteAmountOut, "");

    setSwappingTx([transaction, quoteAmountOut, ratio]);
    setSwappingHelpi(quoteAmountOut);
    setSwappingTransaction(transaction);
    setSwappingTxStatus({ success: true, isLoading: false });
    // return [transaction, quoteAmountOut, ratio];
  };

  const handleSwap = async () => {
    const approvalAmount = ethers.utils.parseUnits(swappingCelo, 18).toString();
    await celoContract
      .connect(signer)
      .approve(V3_SWAP_ROUTER_ADDRESS, approvalAmount)
      .then((tx) => {
        tx.wait().then((responce) => {
          console.log("Approve Responce:", responce);
          signer.sendTransaction(swappingTransaction).then((_tx) => {
            console.log("Transaction:", _tx);
          });
        });
      });
    // signer.sendTransaction(swappingTransaction).then((tx) => {
    //   console.log("Transaction:", tx);
    // });
  };

  useEffect(() => {
    if (signer) {
      handleGetBalance();
      console.log("Getting Balance....");
    }
  }, [signer]);
  return (
    <>
      <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-xl mt-4">
        <div className="relative bg-primary-dull border border-primary-light p-4 m-1 rounded-xl h-auto">
          <h3 className="text-xl text-center font-medium text-secondary">
            <FiAlertCircle className="inline mr-2 mb-1" />
            Easily exchange one cryptocurrency for another without (two
            non-native tokens) leaving their Blockchain Wallet.
          </h3>
        </div>
      </div>
      {/* Swapping */}
      <div className="flex flex-col lg:flex-row  mt-8">
        <div className="w-8/12" />
        <div className="w-full h-auto">
          <div className="w-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-lg">
            <div className="bg-primary-dull border-y border-primary-light shadow rounded-lg flex relative z-30 m-px">
              <div className="w-full p-8">
                <div className="flex justify-between items-center text-xl text-gray-400 font-semibold leading-6 mb-8 px-2">
                  <h3 className="">Swap</h3>
                  {/* Slippage and Deadline Popup ---------------------------------------------- */}
                  <Popover className="relative">
                    <Popover.Button>
                      <GoGear className="text-2xl cursor-pointer" />
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10">
                      <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-xl p-px">
                        <div className="bg-primary-dull border-primary-light rounded-xl px-6 pt-4 pb-6">
                          <h3 className="text-lg font-medium text-secondary">
                            Transaction Settings
                          </h3>
                          <label className="text-sm font-medium text-gray-200 mb-2">
                            Slippage Tolerance %
                          </label>
                          <input
                            type="number"
                            placeholder="0.1%"
                            value={slippage}
                            onChange={(e) => setSlippage(e.target.value)}
                            className="text-sm w-72 text-stone-800 rounded-full outline-none px-3 py-1 my-1"
                          />
                          <label className="text-sm font-medium text-gray-200 mb-2">
                            Transaction Deadline (minutes)
                          </label>
                          <input
                            type="number"
                            placeholder="10"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="text-sm w-72 text-stone-800 rounded-full outline-none px-3 py-1 mt-1"
                          />
                        </div>
                      </div>
                    </Popover.Panel>
                  </Popover>
                  {/* Slippage and Deadline Popup ---------------------------------------------- */}
                </div>
                {/* From */}
                <div className="bg-slate-700 rounded-2xl px-4 py-4 mb-4">
                  <p className="text-sm text-gray-100">Swap From</p>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      placeholder="0"
                      value={swappingCelo}
                      onChange={(e) => {
                        setSwappingCelo(e.target.value);
                        getPrice(e.target.value, slippage, deadline, address);
                      }}
                      className="bg-transparent flex items-center text-2xl leading-12 font-semibold text-gray-400 border-none outline-none pt-1"
                    />

                    <select className="bg-transparent text-base font-semibold text-gray-400 border-none active:border-none outline-none ">
                      <option value="">CELO</option>
                      {/* <option value="">SOL</option>
                      <option value="">BTC</option>
                      <option value="">MTC</option> */}
                    </select>
                  </div>
                  <p className="text-sm text-gray-400">
                    Balance:{" " + balance?.celoToken}
                  </p>
                </div>
                {/* To */}
                <div className="bg-slate-800 rounded-2xl px-4 py-4">
                  <p className="text-sm text-gray-100">Swap To</p>
                  <div className="flex items-center justify-between">
                    {swappingTxStatus.isLoading ? (
                      <BeatLoader
                        loading={swappingTxStatus.isLoading}
                        size={20}
                        className="py-3"
                      />
                    ) : (
                      <input
                        type="number"
                        placeholder="0"
                        value={swappingHelpi}
                        // onChange={(e) =>
                        //   setSwapping({ ...swapping, helpi: e.target.value })
                        // }
                        className="bg-transparent flex items-center text-2xl leading-12 font-semibold text-gray-400 border-none outline-none pt-1"
                      />
                    )}

                    <select
                      default="Select A Token"
                      className="bg-transparent text-base font-semibold text-gray-400 border-none active:border-none outline-none "
                    >
                      <option value="">HELPI V2</option>
                      {/* <option value="">BTC</option>
                      <option value="">MTC</option> */}
                    </select>
                  </div>
                  <p className="text-sm text-gray-400">
                    Balance:{" " + balance?.helpiToken}
                  </p>
                </div>
                {/* Price */}
                {swappingTxStatus.success ? (
                  <div className="flex items-center justify-between my-6">
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="text-sm text-gray-400 flex items-center">
                      <FiAlertCircle className="mr-1" /> 1 HELPI V2 ={" "}
                      {swappingTx[2]} CELO
                    </p>
                  </div>
                ) : (
                  <div className="h-4" />
                )}

                {/* Swap */}
                <button
                  disabled={!swappingTxStatus.success}
                  onClick={() => handleSwap()}
                  className="w-full text-lg font-semibold bg-gradient-to-r from-grad-green via-grad-blue to-grad-purple rounded-full py-2"
                >
                  Swap
                </button>
              </div>
            </div>
          </div>
          {/* Details */}
          <div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-400">Minimum Received</p>
              <p className="text-sm text-gray-200">9.27 CELO </p>
            </div>
            <div className="flex items-center justify-between my-3">
              <p className="text-sm text-gray-400">Price Impact</p>
              <p className="text-sm text-gray-200"> {"<"}0.01% </p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400">Liquidity Provider Fee</p>
              <p className="text-sm text-gray-200">0.00000237 ETH </p>
            </div>
          </div>
        </div>

        <div className="w-8/12" />
      </div>
    </>
  );
}

export default Swapping;
