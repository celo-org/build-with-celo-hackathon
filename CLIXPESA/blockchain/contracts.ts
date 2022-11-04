import { Contract, utils } from 'ethers'
import { ABI as Erc20Abi } from './Abis/erc20'
import { ABI as Erc721Abi } from './Abis/erc721'
import { ABI as CeloTokenAbi } from './Abis/celoToken'
import { ABI as StableTokenAbi } from './Abis/stableToken'
import { ABI as SpacesAbi } from './Abis/spaces'
import { ABI as RoscaAbi } from './Abis/rosca'
import { ABI as LoansAbi } from './Abis/loans'
import { ABI as LoanONRsAbi } from './Abis/loanONRs'
import { ABI as P2PLoanAbi } from './Abis/p2pLoan'
import { getSigner } from './signer'
import { CeloContract, config } from './configs/celo.config'
import { areAddressesEqual, normalizeAddress } from './utils/addresses'

let contractCache: Partial<Record<CeloContract, Contract>> = {}
let tokenContractCache: Partial<Record<string, Contract>> = {} // token address to contract

export const spacesIface = new utils.Interface(SpacesAbi)
export const roscaIface = new utils.Interface(RoscaAbi)
export const ONRsIface = new utils.Interface(LoanONRsAbi)
export const LoansIface = new utils.Interface(LoansAbi)
export const P2PLoanIface = new utils.Interface(P2PLoanAbi)

export function getContract(c: CeloContract) {
  const cachedContract = contractCache[c]
  if (cachedContract) return cachedContract
  const signer = getSigner()
  const address = config.contractAddresses[c]
  const abi = getContractAbi(c)
  const contract = new Contract(address, abi, signer)
  contractCache[c] = contract
  return contract
}

export function getCustomContract(cc: CeloContract, addr: string) {
  const cachedContract = contractCache[addr]
  if (cachedContract) return cachedContract
  const signer = getSigner()
  const address = addr
  const abi = getContractAbi(cc)
  const contract = new Contract(address, abi, signer)
  contractCache[addr] = contract
  return contract
}

export function getErc20Contract(tokenAddress: Address) {
  return getTokenContract(tokenAddress, Erc20Abi)
}

export function getErc721Contract(tokenAddress: Address) {
  return getTokenContract(tokenAddress, Erc721Abi)
}

// Search for token contract by address
function getTokenContract(tokenAddress: Address, abi: string) {
  const normalizedAddr = normalizeAddress(tokenAddress)
  const cachedContract = tokenContractCache[normalizedAddr]
  if (cachedContract) return cachedContract
  const signer = getSigner()
  const contract = new Contract(normalizedAddr, abi, signer)
  tokenContractCache[normalizedAddr] = contract
  return contract
}

function getContractAbi(c: CeloContract) {
  switch (c) {
    case CeloContract.GoldToken:
      return CeloTokenAbi
    case CeloContract.StableToken:
    case CeloContract.StableTokenEUR:
    case CeloContract.StableTokenBRL:
      return StableTokenAbi
    case CeloContract.Spaces:
      return SpacesAbi
    case CeloContract.Rosca:
      return RoscaAbi
    case CeloContract.Loans:
      return LoansAbi
    case CeloContract.LoanONRs:
      return LoanONRsAbi
    case CeloContract.P2PLoan:
      return P2PLoanAbi
    default:
      throw new Error(`No ABI for contract ${c}`)
  }
}

// Search for core contract by address
export function getContractByAddress(address: Address): Contract | null {
  const name = getContractName(address)
  if (name) return getContract(name)
  else return null
}

// Search for core contract name by address
export function getContractName(address: Address): CeloContract | null {
  if (!address) return null
  const contractNames = Object.keys(config.contractAddresses) as Array<CeloContract> // Object.keys loses types
  for (const name of contractNames) {
    const cAddress = config.contractAddresses[name]
    if (areAddressesEqual(address, cAddress)) {
      return name
    }
  }
  return null
}

let erc721Interface: utils.Interface

// Normally, interfaces are retrieved through the getContract() function
// but ERC721 is an exception because no core celo contracts use it
export function getErc721AbiInterface() {
  if (!erc721Interface) {
    erc721Interface = new utils.Interface(Erc721Abi)
  }
  return erc721Interface
}

// Necessary if the signer changes, as in after a logout
export function clearContractCache() {
  contractCache = {}
  tokenContractCache = {}
}
