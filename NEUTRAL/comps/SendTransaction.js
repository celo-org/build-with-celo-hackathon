import * as React from "react";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useRouter } from "next/router";

export function SendTransaction() {
  const Router = useRouter();

  function redirectToResult() {
    Router.push({
      pathname: "/result",
      query: {
        percentage: 100,
      },
    });
  }

  const { config } = usePrepareContractWrite({
    address: "0x1Da87eA2610CAF5192804407EeeA840C670bF0E1",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "updateCarbonOffset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_address",
            type: "address",
          },
        ],
        name: "viewCarbonOffset",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "updateCarbonOffset",
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    console.log("called");
    redirectToResult();
  }, isSuccess);

  return (
    <div>
      <button
        className="p-4 rounded bg-black text-white mt-8"
        disabled={!write || isLoading}
        onClick={() => write()}
      >
        {isLoading ? "Retiring..." : "Retire Carbon"}
      </button>
    </div>
  );
}
