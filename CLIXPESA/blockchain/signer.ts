import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { isProviderSet } from './provider'

// Note this is the wallet's local signer, not to be confused with
// vote signers in the Accounts contract
let signer: CeloWallet | undefined

export function isSignerSet() {
  return !!signer
}

export function getSigner() {
  if (!signer) {
    console.log('Signer is not yet initialized')
    throw new Error('Attempting to use signer before initialized')
  }
  return signer
}

export function setSigner(_signer: CeloWallet) {
  if (!_signer) {
    throw new Error('Signer is invalid')
  }

  if (!isProviderSet()) {
    throw new Error('Provider must be set before signer')
  }

  if (signer) {
    console.log('Signer is being overridden')
  }

  signer = _signer
  console.log('Signer is set')
}

export function clearSigner() {
  signer = undefined
}
