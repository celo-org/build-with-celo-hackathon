import { WALLETS_STORE } from 'clixpesa/app/constants'
import { getUserWallets } from 'clixpesa/app/storage'

export const walletsListCache = {}

export async function hasWallets() {
  const result = await getAccounts()
  return result.length !== 0
}

export async function getDefaultNewWalletName() {
  const list = await getWallets()
  return `Wallet ${list.length + 1}`
}

export async function getWallets() {
  if (Object.keys(walletsListCache).length <= 0) {
    const storedWallets = await getUserWallets(WALLETS_STORE)
    for (const wallet of Array.from(storedWallets)) {
      Object.assign(walletsListCache, { [wallet.address]: wallet })
    }
  }
  return Object.values(walletsListCache) //Always return a list
}
