import {
  setIsConnected,
  setIsSignered,
  setLoggedIn,
  setStatus,
  setUserToken,
} from './essentialSlice'
import { USER_STORE } from 'clixpesa/app/constants'
import { storeUserDetails } from 'clixpesa/app/storage'
import celoHelper from 'clixpesa/blockchain/helpers/celoHelper'
import { connectToProvider } from 'clixpesa/blockchain/provider'

export const essentialListeners = (startListening) => {
  startListening({
    actionCreator: setUserToken,
    effect: async (action, listenerApi) => {
      const userDetails = listenerApi.getState().essential.userDetails
      if (userDetails.userToken !== action.payload) {
        throw new Error('Problem getting user token')
      }
      await storeUserDetails(USER_STORE, userDetails)
    },
  })
  startListening({
    actionCreator: setLoggedIn,
    effect: async (action, listenerApi) => {
      const isProviderConnected = listenerApi.getState().essential.isConnected
      //get private key from store
      const privateKey = '0x20a67adf6750c75ead6e91a6df269a250d301123723d743a8d65c3a57a7b1fa7'
      if (isProviderConnected) {
        if (privateKey && action.payload) {
          await celoHelper.setCeloSigner(privateKey)
          listenerApi.dispatch(setIsSignered(true))
        } else {
          console.log('Unable to set signer')
          listenerApi.dispatch(setIsSignered(false))
        }
      } else {
        try {
          await connectToProvider()
          listenerApi.dispatch(setIsConnected(true))
        } catch (error) {
          console.log('Unable to connect to provider', error)
          listenerApi.dispatch(setIsConnected(false))
        }
      }
    },
  })
}
