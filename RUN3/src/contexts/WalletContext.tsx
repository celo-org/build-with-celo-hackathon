//The purpose of this file is having a global state handler for some situations where a react state is not enought
import React from 'react'
import { useWallet, WalletWithProvider } from './useWallet'

const WalletContext = React.createContext<WalletWithProvider>({} as any)

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { walletWithProvider, setWalletWithProvider } = useWallet()
  return <WalletContext.Provider value={{ walletWithProvider, setWalletWithProvider }}>{children}</WalletContext.Provider>
}

export const useWalletProvider = () => {
  const context = React.useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a useWalletProvider')
  }
  return context
}
