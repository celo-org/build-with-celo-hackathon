import { ethers } from 'ethers'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CeloProvider } from '@celo-tools/celo-ethers-wrapper'

export const useWallet = () => {
  const [walletWithProvider, setWalletWithProvider] = useState<ethers.Wallet>({} as any)
  const [provider, setProvider] = useState<CeloProvider>({} as any)

  useEffect(() => {
    const getWallet = async () => {
      const value = await AsyncStorage.getItem('wallet')
      if (value && !walletWithProvider) setWalletWithProvider(JSON.parse(value))
    }
    getWallet()
  }, [])

  return {
    walletWithProvider,
    setWalletWithProvider,
    setProvider,
    provider,
  }
}

export type WalletWithProvider = {
  walletWithProvider: ethers.Wallet
  setWalletWithProvider: Dispatch<SetStateAction<ethers.Wallet>>
  provider: CeloProvider
  setProvider: Dispatch<SetStateAction<CeloProvider>>
}
