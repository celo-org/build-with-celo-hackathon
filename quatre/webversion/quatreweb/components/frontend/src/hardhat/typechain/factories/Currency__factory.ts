/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { Currency } from "../Currency";

export class Currency__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Currency {
    return new Contract(address, _abi, signerOrProvider) as Currency;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "newToken",
        type: "address",
      },
    ],
    name: "setSupportedTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];