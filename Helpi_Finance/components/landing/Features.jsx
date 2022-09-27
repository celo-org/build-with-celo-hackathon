import React from "react";
import { ImLoop } from "react-icons/im";
import { FaHandshake } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import { AiOutlineSwap } from "react-icons/ai";

function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-6 px-12 xl:px-16 2xl:px-32 gap-4">
      {/* card 1 */}
      <div
        role="listitem"
        className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 flex relative z-30"
      >
        <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
        <div className="w-full p-8">
          <div className="md:flex items-center justify-between">
            <h2 className="flex items-center text-2xl font-semibold leading-6 text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-2">
                <AiOutlineSwap className="text-primary-dark text-sm" />
              </div>
              Swap
            </h2>
            {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
          </div>
          <p className="text-base leading-6 mt-4 text-gray-500">
            Easily exchange one cryptocurrency for another without leaving their
            Blockchain Wallet.
          </p>
        </div>
      </div>
      {/* card 2 */}
      <div
        role="listitem"
        className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 flex relative z-30"
      >
        <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
        <div className="w-full p-8">
          <div className="md:flex items-center justify-between">
            <h2 className="flex items-center text-2xl font-semibold leading-6 text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-2">
                <ImLoop className="text-primary-dark text-sm" />
              </div>
              Staking Pools
            </h2>
            {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
          </div>
          <p className=" text-base leading-6 mt-4 text-gray-500">
            Stake Celo and cUSD tokens to earn Helpi Tokens as Rewards at high
            APR rates.
          </p>
        </div>
      </div>
      {/* card 3 */}
      <div
        role="listitem"
        className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 flex relative z-30"
      >
        <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
        <div className="w-full p-8">
          <div className="md:flex items-center justify-between">
            <h2 className="flex items-center text-2xl font-semibold leading-6 text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-2">
                <BiLockAlt className="text-primary-dark text-sm" />
              </div>
              Vesting
            </h2>
            {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
          </div>
          <p className=" text-base leading-6 mt-4 text-gray-500">
            Implemented to prevent Pumping and Dumping of Tokens by Whales to
            Protect your assets and earnings
          </p>
        </div>
      </div>
      {/* card 4 */}
      <div
        role="listitem"
        className="bg-primary-dull border border-primary-light cursor-pointer shadow rounded-lg mt-3 flex relative z-30"
      >
        <div className="w-2.5 xl:w-0 h-auto bg-gradient-to-tr xl:from-transparent from-grad-green via-grad-blue to-grad-purple rounded-tl-md rounded-bl-md" />
        <div className="w-full p-8">
          <div className="md:flex items-center justify-between">
            <h2 className="flex items-center text-2xl font-semibold leading-6 text-gray-400">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple shadow flex items-center justify-center mr-2">
                <FaHandshake className="text-primary-dark text-sm" />
              </div>
              Contribute
            </h2>
            {/* <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800">
              $18<span className="font-normal text-base">/mo</span>
            </p> */}
          </div>
          <p className=" text-base leading-6 mt-4 text-gray-500">
            Helpi is a Contribution based DeFi Network where each member in the
            ecosystem contributes and helps others to earn interest
          </p>
        </div>
      </div>
    </div>
  );
}

export default Features;
