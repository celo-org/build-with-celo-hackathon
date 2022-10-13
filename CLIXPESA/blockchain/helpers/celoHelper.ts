import { Wallet, BigNumber, BigNumberish, Contract, utils } from 'ethers'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { CeloContract, config } from '../configs/celo.config'
import { getProvider } from '../provider'
import { setSigner } from '../signer'
import { getContractByAddress, getContract, getCustomContract } from '../contracts'
import { CELO_DERIVATION_PATH } from '../utils/consts'
import {
  Token,
  CeloBalancePayload,
  GetEncryptedJsonFromPrivateKey,
  GetTransactionPayload,
  GetWalletFromEncryptedjsonPayload,
  TransferPayload,
  IGetTokenInfoPayload,
  ITokenInfo,
  ISmartContractCallPayload,
} from '../utils/types'
import { successResponse } from '../utils'
import { sendTransaction } from '../transaction'

type TokenMap = Record<Address, Token>

const setCeloSigner = async (privateKey: string) => {
  const provider = getProvider()
  //const wallet = Wallet.fromMnemonic(mnemonic, CELO_DERIVATION_PATH)
  const wallet = new Wallet(privateKey)
  const signer = new CeloWallet(wallet, provider)
  setSigner(signer)
}

const getBalances = async (
  address: Address,
  tokenMap: TokenMap,
): Promise<Record<Address, string>> => {
  const tokenAddrs = Object.keys(tokenMap)
  // TODO may be good to batch here if token list is really long
  const fetchPromises: Promise<{ tokenAddress: Address; value: string }>[] = []
  for (const tokenAddr of tokenAddrs) {
    // logger.debug(`Fetching ${t.id} balance`)
    if (tokenAddr === config.contractAddresses.GoldToken) {
      fetchPromises.push(getCeloBalance(address))
    } else {
      fetchPromises.push(getTokenBalance(address, tokenAddr))
    }
  }

  const newTokenAddrToValue: Record<Address, string> = {}
  const tokenBalancesArr = await Promise.all(fetchPromises)
  tokenBalancesArr.forEach((bal) => (newTokenAddrToValue[bal.tokenAddress] = bal.value))
  return newTokenAddrToValue
}

// TODO Figure out why the balanceOf result is incorrect for GoldToken
// Contractkit works around this in the same way, must be a low-level issue
const getCeloBalance = async (address: Address) => {
  const provider = getProvider()
  const balance = await provider.getBalance(address)
  return { tokenAddress: config.contractAddresses.GoldToken, value: utils.formatUnits(balance, 18) }
}

const getTokenBalance = async (address: Address, tokenAddress: Address) => {
  let contract: Contract | null
  contract = getContractByAddress(tokenAddress)
  if (!contract) throw new Error(`No contract found for token: ${tokenAddress}`)
  const decimals = await contract.decimals()
  const balance: BigNumberish = await contract.balanceOf(address)
  return { tokenAddress, value: utils.formatUnits(balance, decimals) }
}

const createWallet = async (derivationPath?: string) => {
  const path = derivationPath || CELO_DERIVATION_PATH
  const entropy = utils.randomBytes(32)
  const mnemonic = utils.entropyToMnemonic(entropy)
  const wallet = Wallet.fromMnemonic(mnemonic, path)
  return successResponse({
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  })
}

const generateWalletFromMnemonic = async (mnemonic: string, derivationPath?: string) => {
  const path = derivationPath || CELO_DERIVATION_PATH
  const wallet = Wallet.fromMnemonic(mnemonic, path)
  return successResponse({
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  })
}

const smartContractCall = async (contractName: CeloContract, args: any) => {
  let contract: Contract | null
  if (args.contractAddress) {
    contract = getCustomContract(contractName, args.contractAddress)
  } else {
    contract = getContract(contractName)
  }

  //const nonce = await signer.getTransactionCount('pending')
  if (!contract) throw new Error(`No contract found for name: ${contractName}`)
  try {
    let txReceipt: any
    let unsignedTx: any
    let overrides = {} as any

    const feeEstimate = {
      gasPrice: utils.parseUnits('0.1', 'gwei').toString(),
      gasLimit: utils.parseUnits('0.035', 'gwei').toString(),
      fee: '0.0',
      feeToken: config.contractAddresses.StableToken,
    }

    if (args.methodType === 'read') {
      overrides = {}
    } else if (args.methodType === 'write') {
      const { gasPrice, gasLimit } = feeEstimate
      overrides = {
        gasPrice,
        gasLimit,
        //nonce: args.nonce ? args.nonce : 1,
        value: args.value ? utils.parseEther(args.value.toString()) : 0,
      }
    }

    if (args.params) {
      unsignedTx = await contract.populateTransaction[args.method](...args.params, overrides)
      txReceipt = await sendTransaction(unsignedTx, feeEstimate)
    } else {
      txReceipt = await contract?.[args.method](overrides)
    }

    return txReceipt
  } catch (error) {
    throw error
  }
}

export default {
  getBalances,
  getTokenBalance,
  createWallet,
  setCeloSigner,
  //getAddressFromPrivateKey,
  generateWalletFromMnemonic,
  //transfer,
  //getTransaction,
  //getEncryptedJsonFromPrivateKey,
  //getWalletFromEncryptedJson,
  //getTokenInfo,
  smartContractCall,
}
