import React from "react";
import { ethers } from "ethers";
import { useSigner, useAccount } from "wagmi";
import { helpiAddress } from "./../../contracts/addresses";
import { HELPITokenABI } from "./../../contracts/abis";

function BuyToken() {
  const [tokens, setTokens] = React.useState(0);
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const contract = new ethers.Contract(helpiAddress, HELPITokenABI, signer);
  console.log(contract);
  const handleBuyToken = () => {
    // contract
    //   .transfer(address, tokens)
    //   .then((responce) => {
    //     responce.wait().then((tx) => {
    //       console.log(tx);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    alert("Under Construction")
  };
  return (
    <div className="w-full bg-primary-dull border border-primary-light p-4 mt-4 rounded-xl h-auto">
      <span className="">Buy some HELPI Tokens</span>
      <div className="flex flex-col sm:flex-row mt-2">
        <div className="w-full bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple p-px rounded-lg">
          <input
            type="number"
            value={tokens}
            onChange={(e) => setTokens(e.target.value)}
            placeholder="Enter number of Tokens you wanna buy"
            className="w-full bg-primary-dull text-lg font-medium outline-none rounded-lg py-2 px-4"
          />
        </div>
        <button
          onClick={() => handleBuyToken()}
          className="w-full sm:w-4/12 md:w-3/12 lg:w-2/12 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold text-primary-dull py-2 px-4 sm:ml-4 mt-3 sm:mt-0 rounded-lg"
        >
          BUY HLP
        </button>
      </div>
    </div>
  );
}

export default BuyToken;
