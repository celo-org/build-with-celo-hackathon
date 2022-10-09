import { ethers } from 'ethers'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useWallet = () => {
  const [walletWithProvider, setWalletWithProvider] = useState<ethers.Wallet>()

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
  }
}

export type WalletWithProvider = {
  walletWithProvider: ethers.Wallet | undefined
  setWalletWithProvider: Dispatch<SetStateAction<ethers.Wallet | undefined>>
}
