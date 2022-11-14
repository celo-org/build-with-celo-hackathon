import BigNumber from "bignumber.js";

const ZERO_ADDR = `0x${"0".repeat(40)}`;

export type BandTableProps = {
  setPageRef?: Function,
  setmessage?: Function,
  currentPageRef?: number,
  message?: string
}

export type OptionProps = {
  functionName: string;
  contractName: string;
  params?: Array<any>;
  msgValue?: BigNumber;
  hasValue?: boolean;
};

export type Uints = {
  mode: number,
  quorum: BigNumber,
  selector: BigNumber,
  ccr: BigNumber,
  duration: BigNumber,
  0: 0,
  1: BigNumber,
  2: BigNumber,
  3: BigNumber,
  4: BigNumber,
} 

export type Uint256 = {
  unit: BigNumber,
  receivable: BigNumber,
  currentPool: BigNumber,
  0: BigNumber,
  1: BigNumber,
  2: BigNumber,
}

export type Addr = {
  asset: Asset, 
  lastPaid: string,
  0: string, 
  1: string,
}

type Asset = {
  asset: string,
  lastPaid: string, 
  0: string, 
  1: string,
}

export type SinglePool = {
  uints: Uints,
  uint256s: Uint256,
  addr: string,
  mems: Array<string>,
  allGh: BigNumber,
  0: Uints,
  1: Uint256,
  2: string,
  3: Array<string>,
  4: BigNumber,
 
}

export type PoolListContent = Array<SinglePool>;
