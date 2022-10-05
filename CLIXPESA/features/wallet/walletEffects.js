import { fetchBalances, updateBalances } from './walletSlice'
import celoHelper from 'clixpesa/blockchain/helpers/celoHelper'
import { NativeTokensByAddress } from './tokens'

export const walletListeners = (startListening) => {
  startListening({
    actionCreator: fetchBalances,
    effect: async (action, listenerApi) => {
      const isSignerSet = listenerApi.getState().essential.isSignerSet
      const address = listenerApi.getState().wallet.walletInfo.address
      if (isSignerSet) {
        const tokenAddrToValue = await celoHelper.getBalances(address, NativeTokensByAddress)
        listenerApi.dispatch(updateBalances(tokenAddrToValue))
      }
    },
  })
}
