/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface AdjustableTimelockInterface extends ethers.utils.Interface {
  functions: {
    "beneficiary(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setBeneficiary(address,uint16,uint16,uint256,uint256,uint256)": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "beneficiary", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBeneficiary",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "beneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBeneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class AdjustableTimelock extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: AdjustableTimelockInterface;

  functions: {
    beneficiary(
      who: string,
      overrides?: CallOverrides
    ): Promise<{
      data: {
        split: BigNumber;
        nextRelease: BigNumber;
        interval: BigNumber;
        balance: BigNumber;
        firstWithdraw: BigNumber;
        exist: boolean;
        0: BigNumber;
        1: BigNumber;
        2: BigNumber;
        3: BigNumber;
        4: BigNumber;
        5: boolean;
      };
      0: {
        split: BigNumber;
        nextRelease: BigNumber;
        interval: BigNumber;
        balance: BigNumber;
        firstWithdraw: BigNumber;
        exist: boolean;
        0: BigNumber;
        1: BigNumber;
        2: BigNumber;
        3: BigNumber;
        4: BigNumber;
        5: boolean;
      };
    }>;

    "beneficiary(address)"(
      who: string,
      overrides?: CallOverrides
    ): Promise<{
      data: {
        split: BigNumber;
        nextRelease: BigNumber;
        interval: BigNumber;
        balance: BigNumber;
        firstWithdraw: BigNumber;
        exist: boolean;
        0: BigNumber;
        1: BigNumber;
        2: BigNumber;
        3: BigNumber;
        4: BigNumber;
        5: boolean;
      };
      0: {
        split: BigNumber;
        nextRelease: BigNumber;
        interval: BigNumber;
        balance: BigNumber;
        firstWithdraw: BigNumber;
        exist: boolean;
        0: BigNumber;
        1: BigNumber;
        2: BigNumber;
        3: BigNumber;
        4: BigNumber;
        5: boolean;
      };
    }>;

    owner(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "owner()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

    setBeneficiary(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setBeneficiary(address,uint16,uint16,uint256,uint256,uint256)"(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "token()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    withdraw(overrides?: Overrides): Promise<ContractTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  beneficiary(
    who: string,
    overrides?: CallOverrides
  ): Promise<{
    split: BigNumber;
    nextRelease: BigNumber;
    interval: BigNumber;
    balance: BigNumber;
    firstWithdraw: BigNumber;
    exist: boolean;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: boolean;
  }>;

  "beneficiary(address)"(
    who: string,
    overrides?: CallOverrides
  ): Promise<{
    split: BigNumber;
    nextRelease: BigNumber;
    interval: BigNumber;
    balance: BigNumber;
    firstWithdraw: BigNumber;
    exist: boolean;
    0: BigNumber;
    1: BigNumber;
    2: BigNumber;
    3: BigNumber;
    4: BigNumber;
    5: boolean;
  }>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides): Promise<ContractTransaction>;

  "renounceOwnership()"(overrides?: Overrides): Promise<ContractTransaction>;

  setBeneficiary(
    who: string,
    nextReleaseInDays: BigNumberish,
    intervalInDays: BigNumberish,
    firstWithdraw: BigNumberish,
    balance: BigNumberish,
    subsequentSplit: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setBeneficiary(address,uint16,uint16,uint256,uint256,uint256)"(
    who: string,
    nextReleaseInDays: BigNumberish,
    intervalInDays: BigNumberish,
    firstWithdraw: BigNumberish,
    balance: BigNumberish,
    subsequentSplit: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  "token()"(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  withdraw(overrides?: Overrides): Promise<ContractTransaction>;

  "withdraw()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    beneficiary(
      who: string,
      overrides?: CallOverrides
    ): Promise<{
      split: BigNumber;
      nextRelease: BigNumber;
      interval: BigNumber;
      balance: BigNumber;
      firstWithdraw: BigNumber;
      exist: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: boolean;
    }>;

    "beneficiary(address)"(
      who: string,
      overrides?: CallOverrides
    ): Promise<{
      split: BigNumber;
      nextRelease: BigNumber;
      interval: BigNumber;
      balance: BigNumber;
      firstWithdraw: BigNumber;
      exist: boolean;
      0: BigNumber;
      1: BigNumber;
      2: BigNumber;
      3: BigNumber;
      4: BigNumber;
      5: boolean;
    }>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    setBeneficiary(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "setBeneficiary(address,uint16,uint16,uint256,uint256,uint256)"(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    token(overrides?: CallOverrides): Promise<string>;

    "token()"(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;

    "withdraw()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): EventFilter;
  };

  estimateGas: {
    beneficiary(who: string, overrides?: CallOverrides): Promise<BigNumber>;

    "beneficiary(address)"(
      who: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides): Promise<BigNumber>;

    "renounceOwnership()"(overrides?: Overrides): Promise<BigNumber>;

    setBeneficiary(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "setBeneficiary(address,uint16,uint16,uint256,uint256,uint256)"(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    "token()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    withdraw(overrides?: Overrides): Promise<BigNumber>;

    "withdraw()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    beneficiary(
      who: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "beneficiary(address)"(
      who: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides): Promise<PopulatedTransaction>;

    "renounceOwnership()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    setBeneficiary(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setBeneficiary(address,uint16,uint16,uint256,uint256,uint256)"(
      who: string,
      nextReleaseInDays: BigNumberish,
      intervalInDays: BigNumberish,
      firstWithdraw: BigNumberish,
      balance: BigNumberish,
      subsequentSplit: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "token()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    withdraw(overrides?: Overrides): Promise<PopulatedTransaction>;

    "withdraw()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}
