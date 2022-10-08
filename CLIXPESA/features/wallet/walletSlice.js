import { createAction, createSlice } from '@reduxjs/toolkit'

const walletInitialState = {
  walletInfo: {
    address: null,
    isUnlocked: false,
    isRegistered: false,
    voteSignerFor: null,
    lastUpdated: null,
  },
  walletBalances: {
    tokenAddrToValue: null,
    lockedCelo: {
      locked: '0',
      pendingBlocked: '0',
      pendingFree: '0',
    },
    lastUpdated: null,
  },
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState: walletInitialState,
  reducers: {
    updateBalances: (state, action) => {
      const { tokenAddrToValue, lastUpdated } = action.payload
      state.walletBalances.tokenAddrToValue = tokenAddrToValue
      state.walletBalances.lastUpdated = lastUpdated
    },
    updateWalletAddress: (state, action) => {
      state.walletInfo.address = action.payload
    },
  },
})

export const { updateBalances, updateWalletAddress } = walletSlice.actions

//Created action
export const createWallet = createAction('wallet/createWallet')
export const importWallet = createAction('wallet/importWallet')
export const fetchBalances = createAction('wallet/fetchBalances')

export default walletSlice.reducer
