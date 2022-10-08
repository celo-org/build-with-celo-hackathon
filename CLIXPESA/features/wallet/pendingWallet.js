import { Wallet } from 'ethers'
import celoHelper from 'clixpesa/blockchain/helpers/celoHelper'
import { normalizeMnemonic } from 'clixpesa/blockchain/utils/mnemonic'

// Used to temporarily hold keys for flows where
// account creation/import is separate step than password set
// For security, prefer to store them here instead of nav state or redux
// Referenced from celo-web-wallet

export let pendingWallet = null //{Wallet, isImported}

export async function setPendingWallet(mnemonic, isImported = true) {
  if (pendingWallet) {
    console.warn('Overwriting existing pending account') //replace with degugging logger
  }
  const formattedMnemonic = normalizeMnemonic(mnemonic)
  const importedWallet = await celoHelper.generateWalletFromMnemonic(formattedMnemonic)
  pendingWallet = { importedWallet, isImported }
  console.log(pendingWallet)
}

export function setPendingWithWallet(isImported = false) {
  const wallet = Wallet
  if (pendingWallet) {
    console.warn('Overwriting existing pending account')
  }
  pendingWallet = { wallet, isImported }
}

export function getPendingWallet() {
  const pending = pendingWallet
  // Auto-clear it after first read
  pendingWallet = null
  return pending
}
