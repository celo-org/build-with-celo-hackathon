import { createAction, createSlice } from '@reduxjs/toolkit'

const walletInitialState = {
  walletInfo: {
    address: '0x8E912eE99bfaECAe8364Ba6604612FfDfE46afd2',
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
      state.walletBalances.tokenAddrToValue = action.payload
    },
  },
})

export const { updateBalances } = walletSlice.actions

//Created action
export const fetchBalances = createAction('wallet/fetchBalances')

export default walletSlice.reducer
