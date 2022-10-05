import { config } from 'clixpesa/blockchain/configs/celo.config'
import { NULL_ADDRESS } from '../../blockchain/utils/consts'

export const CELO = {
  symbol: 'CELO',
  name: 'Celo Native',
  address: config.contractAddresses.GoldToken,
  decimals: 18,
  chainId: config.chainId,
  sortOrder: 10,
}
export const cUSD = {
  symbol: 'cUSD',
  name: 'Celo Dollar',
  address: config.contractAddresses.StableToken,
  decimals: 18,
  chainId: config.chainId,
  exchangeAddress: config.contractAddresses.Exchange,
  sortOrder: 20,
}
export const cEUR = {
  symbol: 'cEUR',
  name: 'Celo Euro',
  address: config.contractAddresses.StableTokenEUR,
  decimals: 18,
  chainId: config.chainId,
  exchangeAddress: config.contractAddresses.ExchangeEUR,
  sortOrder: 30,
}
export const cREAL = {
  symbol: 'cREAL',
  name: 'Celo Brazilian Real',
  address: config.contractAddresses.StableTokenBRL,
  decimals: 18,
  chainId: config.chainId,
  exchangeAddress: config.contractAddresses.ExchangeBRL,
  sortOrder: 40,
}

export const NativeTokens = [CELO, cUSD, cEUR, cREAL]
export const StableTokens = [cUSD, cEUR, cREAL]

export const NativeTokensByAddress = {
  [CELO.address]: CELO,
  [cUSD.address]: cUSD,
  [cEUR.address]: cEUR,
  [cREAL.address]: cREAL,
}

export const UnknownToken = {
  symbol: 'unknown',
  name: 'Unknown Token',
  address: NULL_ADDRESS,
  decimals: 18,
  chainId: config.chainId,
}
