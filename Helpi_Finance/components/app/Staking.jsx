import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useSigner, useAccount } from "wagmi";
import { ethers } from "ethers";
import { StakingABI, celoImplementationABI } from "../../contracts/abis";
import {
  celoAddress,
  StakingAddress,
  // celoImplementationAddress,
} from "../../contracts/addresses";
// Tostify Popup
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Staking() {
  const [stakingToken, setStakingToken] = React.useState(0);
  const [stakingInfo, setStakingInfo] = React.useState({
    balance: 0,
    reward: 0,
    allowance: 0,
  });
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const STKContract = new ethers.Contract(StakingAddress, StakingABI, signer);
  const CeloContract = new ethers.Contract(
    celoAddress,
    celoImplementationABI,
    signer
  );
  // ----------------------------------------------------- STAKING ---------- >
  const handleStakeToken = () => {
    toast.promise(
      STKContract.stake(stakingToken)
        .then((transaction) => {
          toast.promise(
            transaction
              .wait()
              .then((tx) => {
                console.log("Tx:", tx);
                toast.info(tx);
                fetchStakingInfo();
              })
              .catch((err) => {
                console.log("Error in Staking Token:", err);
                toast.error("Error in Staking Token:", err);
              }),
            {
              pending: "Staking in Process...",
              success: "Stake Successfully 👌",
            }
          );
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(
            error?.error?.data?.message
              ? error?.error?.data?.message
              : "User Reject the Transaction!"
          );
        }),
      {
        pending: "Wait for stake transaction...",
        error: "Transaction rejected 🤯",
      }
    );
  };
  const handleAllowance = () => {
    if (stakingInfo?.allowance < stakingToken) {
      toast.promise(
        CeloContract.increaseAllowance(StakingAddress, stakingToken)
          .then((allowance) => {
            toast.promise(
              allowance
                .wait()
                .then((tx) => handleStakeToken())
                .catch((allowanceError) => {
                  console.log("Allowance Error:", allowanceError);
                }),
              {
                pending: "Allowance in Process...",
                error: "Something went wrong with allowance 🤯",
              }
            );
          })
          .catch((error) => {
            console.log("Approve Allowance Error:", error);
          }),
        {
          pending: "Wait for allowance transaction...",
          error: "Transaction rejected 🤯",
        }
      );
    } else {
      handleStakeToken();
    }
  };
  const handleStacking = () => {
    handleAllowance();
  };
  // ----------------------------------------------------- UNSTAKING -------- >
  const handleUnstacking = () => {
    toast.promise(
      STKContract.unStake(stakingToken)
        .then((transaction) => {
          toast.promise(
            transaction
              .wait()
              .then((tx) => {
                console.log("Tx:", tx);
                toast.info(tx);
                fetchStakingInfo();
              })
              .catch((err) => {
                console.log("Error in Unstaking Token:", err);
                toast.error("Error in Unstaking Token:", err);
              }),
            {
              pending: "Unstaking in Process...",
              success: "Unstake Successfully 👌",
            }
          );
        })
        .catch((error) => {
          console.log("Error:", error);
          toast.error(
            error?.error?.data?.message
              ? error?.error?.data?.message
              : "User Reject the Transaction!"
          );
        }),
      {
        pending: "Signing Transaction...",
        error: "Transaction rejected 🤯",
      }
    );
  };
  // ----------------------------------------------------- UNSTAKING -------- >
  const fetchStakingInfo = async () => {
    const balance = await STKContract.s_balances(address)
      .then((balance) => {
        return parseInt(balance, 10)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      })
      .catch((error) => console.log(error));
    const reward = await STKContract.s_rewards(address)
      .then((reward) => {
        return parseInt(reward, 10)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      })
      .catch((error) => console.log(error));
    const allowance = await CeloContract.allowance(address, StakingAddress)
      .then((responce) => {
        return parseInt(responce._hex, 16);
      })
      .catch((error) => {
        console.log("Get Allowance Error:", error);
        toast.error("Getting Allowance Error");
      });
    setStakingInfo({ balance, reward, allowance });
  };
  React.useEffect(() => {
    if (signer) fetchStakingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);
  console.log("stacking Info:", stakingInfo);
  return (
    <>
      <ToastContainer />
      <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-xl mt-4">
        <div className="relative bg-primary-dull border border-primary-light p-4 m-1 rounded-xl h-auto">
          <h3 className="text-xl text-center font-medium text-secondary">
            <FiAlertCircle className="inline mr-2 mb-1" />
            Stake HLP and earn more HLP Tokens as a reward according to the
            Return rate. To earn more reward, stake the tokens for longer
            durations and keep contributing to the network every 24 hours or
            less through the Contribute Tab.
          </h3>
          {/* <RiCloseFill className="absolute top-auto botton-auto" /> */}
        </div>
      </div>
      <div className="bg-primary-dull border border-primary-light p-4 mt-4 rounded-xl h-auto">
        {/* div with 3 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* card 1 */}
          <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-lg">
            <div className="bg-primary-dull shadow rounded-lg flex relative z-30 m-px">
              <div className="w-full p-8">
                <p className="text-base leading-6 text-gray-500 mb-3">
                  STAKED CELO
                </p>
                <h2 className="flex items-center text-2xl font-semibold text-gray-200">
                  {stakingInfo.balance}
                  <span className="text-sm font-semibold mt-2 pl-1">
                    CELO (in wei)
                  </span>
                </h2>
              </div>
            </div>
          </div>
          {/* card 2 */}
          <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-lg">
            <div className="bg-primary-dull shadow rounded-lg flex relative z-30 m-px">
              <div className="w-full p-8">
                <p className="text-base leading-6 text-gray-500 mb-3">
                  HLP REWARDS
                </p>
                <h2 className="flex items-center text-2xl font-semibold text-gray-200">
                  {stakingInfo.reward}{" "}
                  <span className="text-sm font-semibold mt-2 pl-1">
                    HLP (in wei)
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* div with 2 cols */}

        <div className="mt-4">
          <div className="bg-primary-light shadow rounded-lg flex relative z-30 m-px">
            <div className="w-full p-8">
              <div className="flex justify-end">
                <button className="text-sm font-semibold text-primary-light bg-gradient-to-r from-grad-green via-grad-blue to-grad-purple hover:bg-gradient-to-l hover:from-grad-green hover:via-grad-blue hover:to-grad-purple rounded-full py-2 px-6 ml-auto mb-4">
                  START AUTO COMPOUND
                </button>
              </div>

              {/* --------------------------  */}
              <div className="flex items-center justify-between">
                <p className="text-base leading-6 text-secondary">
                  Wallet Balance: 0.00 HLP
                </p>
                <p className="text-base leading-6 text-secondary">
                  {/* APY: 3153.60% */}
                  Allowance Token:{" "}
                  {stakingInfo?.allowance
                    ?.toString()
                    ?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  Celo (in wei)
                </p>
              </div>
              {/* -------------------------------- */}
              <div className="w-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-full mt-6 mr-2">
                <input
                  type="number"
                  onChange={(event) => setStakingToken(event.target.value)}
                  value={stakingToken}
                  placeholder="Enter the amount"
                  className="w-[calc(100%-2px)] font-medium text-primary-dull border-none rounded-full py-3 px-6 m-px"
                />
              </div>
              <span
                className={`flex justify-end text-sm mt-1 mr-1 ${
                  stakingToken > 0 ? "text-green-300" : "text-red-300"
                }`}
              >
                {/* global BinInt */}
                {stakingToken > 0
                  ? ethers.utils.formatEther(stakingToken) + " Celo"
                  : "Value must be greater then 0 and in Decimals"}
              </span>
              <button
                onClick={() => handleStacking()}
                className="w-full font-semibold text-primary-light bg-gradient-to-r from-grad-green via-grad-blue to-grad-purple hover:bg-gradient-to-l hover:from-grad-green hover:via-grad-blue hover:to-grad-purple rounded-full py-3 px-6 mt-4"
              >
                STAKE CELO
              </button>
              <button
                onClick={() => handleUnstacking()}
                className="w-full font-semibold bg-red-600 rounded-full py-3 px-6 mt-4"
              >
                UNSTAKE CELO
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Staking;
