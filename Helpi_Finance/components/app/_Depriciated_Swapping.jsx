import React from "react";
import { FiAlertCircle } from "react-icons/fi";

function Swapping() {
  return (
    <>
      <div className="bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-xl mt-4">
        <div className="relative bg-primary-dull border border-primary-light p-4 m-1 rounded-xl h-auto">
          <h3 className="text-xl text-center font-medium text-secondary">
            <FiAlertCircle className="inline mr-2 mb-1" />
            Easily exchange one cryptocurrency for another without (two
            non-native tokens) leaving their Blockchain Wallet.
          </h3>
          {/* <RiCloseFill className="absolute top-auto botton-auto" /> */}
        </div>
      </div>
      {/* Swapping */}
      {/* <div className="bg-primary-dull border border-primary-light p-4 mt-4 rounded-xl h-auto"> */}
      <div className="flex flex-col lg:flex-row  mt-8">
        <div className="w-8/12" />
        <div className="w-full h-auto">
          <div className="w-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple rounded-lg">
            <div className="bg-primary-dull border-y border-primary-light shadow rounded-lg flex relative z-30 m-px">
              <div className="w-full p-8">
                <h3 className="text-xl font-semibold leading-6 text-gray-400 mb-4 text-center">
                  Swap
                </h3>
                {/* From */}
                <div className="pt-4 pb-6">
                  <p className="text-sm text-gray-100">Swap From</p>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      placeholder="0"
                      className="bg-transparent flex items-center text-2xl leading-12 font-semibold text-gray-400 border-none outline-none pt-1"
                    />

                    <select className="bg-transparent text-base font-semibold text-gray-400 border-none active:border-none outline-none ">
                      <option value="">ETH</option>
                      <option value="">SOL</option>
                      <option value="">BTC</option>
                      <option value="">MTC</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-400">Balance: 70.45</p>
                </div>
                <hr />
                {/* To */}
                <div className="pt-6">
                  <p className="text-sm text-gray-100">Swap To</p>
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center text-2xl leading-12 font-semibold text-gray-400 pt-1">
                      0
                    </h2>
                    <select
                      default="Select A Token"
                      className="bg-transparent text-base font-semibold text-gray-400 border-none active:border-none outline-none "
                    >
                      <option value="">CELO</option>
                      <option value="">BTC</option>
                      <option value="">MTC</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-400">Balance: -</p>
                </div>
                {/* Price */}
                <div className="flex items-center justify-between my-6">
                  <p className="text-sm text-gray-400">Price</p>
                  <p className="text-sm text-gray-400">0.000237 ETH per CELO </p>
                </div>
                {/* Swap */}
                <button className="w-full text-lg font-semibold bg-gradient-to-r from-grad-green via-grad-blue to-grad-purple rounded-full py-2">
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
      {/* </div> */}
    </>
  );
}

export default Swapping;
